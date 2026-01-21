import Column from '@/components/Column';
import CreateColumn from '@/components/CreateColumn';
import { prisma } from '@/lib/prisma';
import { ColumnWithTasks } from '@/types';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react'

interface Props{
  params: { id: string }
}

const Board = async ({ params }: Props) => {
  const { id } = await params;
  const userId =(await headers()).get('x-user-id');

  const board = await prisma.board.findFirst({
    where: {
      id: id,
      ownerId: userId || undefined
    }, 
    include: {
      columns: {
        orderBy: {order: 'asc'},
        include: {
          tasks: {
            orderBy: {order: 'asc'},
            select: {id: true, title: true, order: true}
          }
        }
      }
    }
  });

  if(!board){
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100'>
        <div className='text-center p-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Board Not Found</h1>
          <Link href="/boards" className='text-indigo-600 hover:text-indigo-700 font-semibold'>Back to Boards</Link>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100'>
      <header className='border-b border-gray-200/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent'>{board.title}</h1>
              <p className='text-gray-500 mt-1'>{board.columns.reduce((sum: number, col: {tasks: {id: string; title: string; order: number}[]}) => sum + col.tasks.length, 0)} tasks </p>
            </div> 
            <Link href="/boards" className='px-6 py-3 text-sm font-semibold text-gray-700 bg-white/50 hover:bg-white rounded-xl border border-gray-200/50 hover:shadow-md transition-all'>All Boards</Link>
          </div>
        </div>
      </header>
      <main className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex gap-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent min-h-150'>
          {board.columns.length === 0 ? (
            <div className='flex-1 min-w-100 flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300'>
              <CreateColumn boardId={id}/>
            </div>
          ): (
            <>
              {board.columns.map((column: ColumnWithTasks) => (
                <Column 
                  key = {column.id}
                  column = {column}
                  boardId = {id}
                />
              ))}
              <CreateColumn boardId={id}/>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Board