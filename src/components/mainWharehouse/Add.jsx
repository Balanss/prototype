
import {useState} from 'react'
import { db } from '../../Firebase'
import { collection, doc,setDoc, serverTimestamp } from "firebase/firestore";

export default function Add() {
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ quantity, setQuantity ] = useState('');

    const handleSubmit = (e) => {
        // use firebase v9 to add data to firestore collection called warehouse
        // use the following fields: name, price, quantity
        
         e.preventDefault(  )
          const docRef = collection(db, "warehouse");
          const colRef = doc(docRef, name);
          setDoc(colRef, {
            name: name,
            price: Number(price),
            quantity: Number(quantity),
            timeStamp:serverTimestamp()
          });
        }

  return (
    <div className=' rounded p-10  h-screen  justify-center items-center w-[90vw] m-auto inline-flex flex-col'>
    <h1 className="text-2xl font-bold">Add to warehouse</h1>
      <form onSubmit={handleSubmit} className=" bg-op2 p-10 rounded inline-flex flex-col items-end">
        <div className="flex flex-col">
          <label className="">Name</label>
          <input type="text" name="name" className='border p-2 text-black'  onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label className="">Price</label>
          <input type="text" name="price" className='border p-2 text-black' onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label className="">Quantity</label>
          <input type="text" name="quantity" className='border p-2 text-black' onChange={(e) => setQuantity(e.target.value)} />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white mt-2 font-bold py-2 px-4 rounded">Add</button>
      </form>
    </div>
  )
}
