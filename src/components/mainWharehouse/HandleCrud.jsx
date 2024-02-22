/* eslint-disable react/prop-types */
import { collection, doc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from '../../Firebase';




export default function HandleCrud({currentName,currentPrice,currentQuantity,setCurrentPrice,setCurrentQuantity,setEdit,edit,setDeleteitem,deleteItem}) {





    const handleUpdate = (e) => {
        e.preventDefault()
        const docRef = collection(db, "warehouse");
        const colRef = doc(docRef, currentName);
        updateDoc(colRef, {
          price: Number(currentPrice),
          quantity: Number(currentQuantity),
          updated:serverTimestamp(),
          updatedBy:'user-name',
        },{merge:true});

     
      }
      
      const handleOfficialDelete =async () => {
        const docRef = doc(db, 'warehouse', currentName); // replace 'currentItem.id' with the id of the item you want to delete
        await deleteDoc(docRef);
        setDeleteitem(false);
      
      }

  return (

    <>
   
    {edit && <div className=' p-4  rounded-md absolute z-[1000] bg-slate-900 inset-0'>

<h2>Currently working on {currentName}</h2>

  <form onSubmit={handleUpdate} className="space-y-4 w-1/2 m-auto ">
    <div className="flex flex-col">
      <label className="mb-2">Price</label>
      <input type="number" placeholder={currentPrice} className='border p-2 text-black' onChange={(e) => setCurrentPrice(e.target.value)} />
    </div>

    <div className="flex flex-col">
      <label className="mb-2">Quantity</label>
      <input type="number" placeholder={currentQuantity} className='border p-2 text-black' onChange={(e) => setCurrentQuantity(e.target.value)} />
    </div>

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
  
  </form>
  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setEdit(false)}>close</button>
    </div>}

    {deleteItem && <div className=' p-4 shadow-card rounded-md w-[300px] h-[400px] absolute z-[1000] bg-slate-900 inset-0'>

<h2>Currently deleting {currentName}</h2>

<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded" onClick={handleOfficialDelete}>Delete</button>
 <br />
  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-10" onClick={() => setDeleteitem(false)}>close</button>
    </div>}
    
    </>
    
  )
}
