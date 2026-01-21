import { createBoard } from '@/actions/boards';
import BoardCard from '@/components/BoardCard';
import BoardsClient from '@/components/BoardsClient';
import { prisma } from '@/lib/prisma';
import { Board } from '@prisma/client';
import { headers } from 'next/headers'
import Image from 'next/image';
import React from 'react'

const Boards = async () => {
  const userId =(await headers()).get('x-user-id');
  const boards = await prisma.board.findMany({
    where: { ownerId: userId || undefined },
    orderBy: { createdAt: 'desc' },
  });
  
  return (
    <div className= 'bg-gray-50 min-h-screen'>
      <div className='max-w-4xl mx-auto p-8'>
        <div className='flex justify-between items-center mb-12'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>My Boards</h1>
          <BoardsClient />
        </div>
        {boards.length === 0 ? (
          <div className='text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 items-center'>
            <div className="w-24 h-24 bg-indigo-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>No Boards Yet!</h2>
            <p className='text-xl text-gray-600 mb-8 max-w-md mx-auto'>Organize your work with beautiful kanban boards. Get sarted by creating your first one.</p>
            <div className='max-w-full flex justify-center items-center'>
              <BoardsClient/>
            </div>
          </div>
        ) :
         (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {boards.map((board: any) => (
            <BoardCard key={board.id} board={board} />
          ))}
         </div>)
        }
      </div>
    </div>
  )
}

export default Boards