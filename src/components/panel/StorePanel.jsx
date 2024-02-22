/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


export default function StorePanel({setView}) {

  

const array = [
    {name:'Stock'},
    {name:'Track'},
    {name:'History'},
    
]

  return (
    <div className="flex flex-col bg-slate-900 p-2 min-h-screen w-[10vw]">
        {array.map(item => (
            <div key={item.name} className='flex justify-between gap-3 mb-5 cursor-pointer hover:bg-slate-800 hover:p-2 rounded' onClick={() => setView(item.name)}>
                <p>{item.name}</p>
            </div>
        ))}

   <div className="mt-10">
    <Link to='/' className='bg-blue-400 px-2  py-2 rounded '>Home</Link>
   </div>

    </div>
  )
}
