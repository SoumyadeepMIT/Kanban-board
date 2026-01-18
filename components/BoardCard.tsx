import { Board } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props{
    board: Board
}
const BoardCard = ({ board }: Props) => {
  return (
    <Link href={`/boards/${board.id}`} className='group'>
        <div className='relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow:xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 shadow-lg transform -skew-x-12 group-hover:skew-x-3 transition-transform duration-500'/>
            <div className='relative z-10'>
                <div className='w-20 h-20 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center shadow-lg border border-white/50 '>
                    <Image src="/icons/board.svg" alt="Board Icon" width={40} height={40} className='text-indigo-600 group-hover:text-indigo-700 transition-colors-drop-shadow-lg'/>
                </div>
                <h3 className='font-bold text-xl mb-3 leading-light line-clamp-2 text-gray-900 group-hover:text-indigo-500 transition-colors'>{board.title}</h3>
                <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-500 font-medium bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm'>
                        {new Date(board.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                    <div className='flex items-center gap-1 text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity'>
                        <Image src="/icons/arrow-right.svg" alt="Arrow Right Icon" width={16} height={16} />
                        Open
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default BoardCard