/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { useCargo } from '../context/CargoContext';
import { collection, doc, updateDoc,getDoc ,deleteDoc,deleteField} from 'firebase/firestore';
import { db } from '../../Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Track() {


    const {cargoItems} = useCargo();

    const [ edit, setEdit] = useState(0);
 
    const [confirm, setConfirm] = useState(false);

    const handleUpdate = async (id,name,quantity) => {
        // const cargoRef = doc(db, 'Cargo', id);
        // const docRef = doc(db, 'warehouse', name);
        // const docSnap = await getDoc(docRef);
      
        // if (!docSnap.exists()) {
        //   console.log('No such document!');
        //   return;
        // } else {
        //   const currentQuantity = docSnap.data().quantity;
        //   if (currentQuantity < edit) {
        //     toast.error('Edit quantity is greater than current quantity');
        //     return;
        //   }
      
        //   await updateDoc(docRef, {
        //     quantity: currentQuantity - Number(edit)
        //   }, { merge: true });

        //   await updateDoc(cargoRef, {
        //     [`${name}.quantity`]: quantity - - Number(edit)
        // },{merge:true});
        // }

        toast.info('order has been updated');
      
    }


    const handleCancel = async(id,name,quantity) => {
        const cargoRef = doc(db, 'Cargo', id);
        const docRef = doc(db, 'warehouse', name);
        const docSnap = await getDoc(docRef);
      
        if (!docSnap.exists()) {
          console.log('No such document!');
          return;
        } else {
          const currentQuantity = docSnap.data().quantity;
          await updateDoc(docRef, {
            quantity: currentQuantity - - Number(quantity)
          }, { merge: true });

          await updateDoc(cargoRef, {
            [`order.${name}`]: deleteField()
          });

        toast.warning('order has been cancelled');
        }
    }

    const handleReady = async(id,name) => {
        const cargoRef = collection(db, 'Cargo');
        const colRef = doc(cargoRef, id);
        updateDoc(colRef, {
          [`order.${name}.status`]: 'ready for transport',
      },{merge:true});

        toast.success('All orders are ready for transport');
        }
      

  


  return (
    <div className='flex flex-col items-start justify-start ml-10'>
    <div className='inline-flex items-center flex-col'>
      <h1 className='text-3xl font-bold text-center mt-4'>Track Orders</h1>
    </div>
      <div className='flex flex-col gap-4 w-[80vw] rounded flex-wrap m-auto'>
        <ToastContainer />
        {Object.values(
          cargoItems.reduce((acc, cargoItem) => {
            const order = cargoItem.order;
            const itemNames = Object.keys(order);

            itemNames.forEach(itemName => {
              const item = order[itemName];
              const id = item.id;

              if (!acc[id]) acc[id] = [];

              acc[id].push(item);
            });

            return acc;
          }, {})
        ).map(items => (
          
          <div key={items[0].id} className={`${items[0].status === 'accepted'? 'hidden':'grid grid-cols-3 bg-slate-900 shadow-card items-start gap-4 p-4 rounded-md hover:shadow-dark-effect '}`}>
            
            {items.map(item => { 
              return (
                <div key={item.name} className='flex flex-col gap-y-1  '>
                <h2>{item.name}</h2>
                <p>Status: {item.status}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
                <p>Delivery date: {item.delivery}</p>
                <p>Driver: {item.driver}</p>
                <p>Send on: {item.sendOn?.toDate().toString()}</p>
               <div className='flex flex-row gap-x-4'>
               <button className='bg-yellow-600 p-2 rounded' onClick={() => handleUpdate(item.id,item.name,item.quantity)}>Update</button>
                <button className='bg-red-600 p-2 rounded' onClick={() => handleCancel(item.id,item.name,item.quantity)}>Cancel</button>
               </div>
              </div>
              )
             })}
            <button onClick={() => items.forEach(item => handleReady(item.id, item.name))} className='flex items-start px-4 rounded bg-blue-500'>Ready for transport</button>
          </div>
        ))}
      </div>
    </div>
  );
}
