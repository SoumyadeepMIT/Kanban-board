'use client';
import { createBoard } from '@/actions/boards';
import Image from 'next/image';
import React, { useTransition, useState } from 'react'


const BoardsClient = () => {
    const [isPending, startTransition] = useTransition();
    const [showForm, setShowForm] = useState(false);
  return (
    <div className='flex flex-col sm:flex-row gap-3 items-center'>
        <button 
        onClick={()=>setShowForm(!showForm)}
        className='flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl'
        >
            <Image src="/icons/plus.svg" alt="Plus Icon" width={20} height={20} className='group-hover:scale-110 transition-transform' />
            {showForm ? 'Cancel' : 'Create Board'}
        </button>
        {showForm && (
            <form action={createBoard} className='flex gap-2 bg-white p-1 rounded-xl shadow-lg border'>
                <input 
                    name='title'
                    type='text'
                    placeholder = 'Enter board name...'
                    className='px-4 py-3 flex-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg placeholder-gray-500 text-gray-900 transition-all'
                    required
                    maxLength={50}
                />
                <button
                    type='submit'
                    disabled={isPending}
                    className='px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 whitespace-nowrap shadow-lg'
                >
                    {isPending ? 'Creating...' : 'Create'}
                </button>
            </form>
        )}
    
    </div>
  )
}

export default BoardsClient