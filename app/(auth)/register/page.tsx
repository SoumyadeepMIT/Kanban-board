'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Register = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); 
        setError('');
        try {
            const res = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ email, password, name }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.ok) {
                router.push('/boards')
                return;
            } 
            else {
                const data = await res.json()
                setError(data.message)
            }
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
            <div>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create a new account</h2>
            </div>
            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>{error}</div>
                )}
                <div className='space-y-4'>
                    <div>
                        <label htmlFor='name' className='sr-only'>Name</label>
                        <input 
                            id='name'
                            name='name'
                            type='text'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            placeholder='Full Name'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='sr-only'>Email</label>
                        <input 
                            id='email'
                            name='email'
                            type='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            placeholder='Email address'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='sr-only'>Password</label>
                        <input 
                            id='password' 
                            name='password'
                            type='password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            placeholder='Password'
                        />
                    </div>
                </div>
                <div>
                    <button 
                        type='submit'
                        disabled = {isLoading}
                        className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indgo-500 disabled:opacity-50'
                    >
                        {isLoading? 'Registering...': 'Register'}
                    </button>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default Register