import { prisma } from '@/lib/prisma';
import { headers } from 'next/dist/server/request/headers';
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
        orderBy: {order: 'asc'}
      }
    }
  });

  if(!board){
    return <div>Board not found or you do not have access to it.</div>
  }
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-xl shadow-sm border p-6 mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>{board.title}</h1>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {board.columns.map((column) => (
            <div key={column.id} className="bg-white min-w-70 rounded-xl shadow-sm border p-6 shrink-0">
              <h2 className="font-semibold text-lg mb-4">{column.title}</h2>
              <p className="text-gray-500 text-sm">No tasks</p>
            </div>
          ))}
          
          <div className="bg-gray-100 min-w-70 rounded-xl shadow-sm border p-6 shrink-0 text-center">
            <button className="text-indigo-600 hover:text-indigo-700 font-medium">
              + Add Column
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board