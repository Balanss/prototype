import React from 'react'

export default function Filter({setFilter}) {
  return (
    <div>
        <form className='flex justify-center items-center mt-2 mb-3'>
            <input type="text" className='bg-slate-800 p-2 rounded-md' placeholder='Search' onChange={(e) => setFilter(e.target.value)} />
            {/* <button className='bg-yellow-500 text-black p-2 font-light text-sm ml-10 rounded' >Search</button> */}
            </form>
    </div>
  )
}
