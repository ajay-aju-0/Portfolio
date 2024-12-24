import React from 'react'

const Loader = () => {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]'>
        <div className='flex gap-5 text-6xl font-semibold sm:text-3xl'>
            <h1 className='text-secondary A'>A</h1>
            <h1 className='text-white T'>T</h1>
            <h1 className='text-gray-600 M'>M</h1>
        </div>
    </div>
  )
}

export default Loader