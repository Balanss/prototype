/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import TruckPanel from '../panel/TruckPanel'
import { useCargo } from '../context/CargoContext';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Trucks() {
  const [view, setView] = useState('Rides')
  const {cargoItems} = useCargo();

  const handleAccept = async (id,name,quantity) => {
    const cargoRef = doc(db, 'Cargo', id);
    await updateDoc(cargoRef, {
      [`order.${name}.status`]: 'Driver Leaving - package dropped off at the store',
      [`order.${name}.LeavingStore`]: serverTimestamp(),
    },{merge:true});

    toast.success('Order has been accepted');

  }
  const handleCancel = (id,name,quantity) => {
    toast.success('notified the team that an issue has occured.');
  }

  const handleDriver = async (id,name,quantity) => {
    const cargoRef = doc(db, 'Cargo', id);
    await updateDoc(cargoRef, {
      [`order.${name}.status`]: 'Driver Accepted - Package On the way',
      [`order.${name}.LeavingWH`]: serverTimestamp(),
    },{merge:true});

    toast.success('Order has been accepted');

  }

 
  return (<> 

  <div className='flex-row flex'> 
     <TruckPanel setView={setView} />
     <section className='flex flex-col items-start flex-wrap ml-4'>
       <h1 className='text-3xl font-bold text-center mt-4'>Driver : {`'driver name here '`}</h1>
       <div className='flex flex-row'>
      <ToastContainer />
     
      
      <section>
        {view === 'Rides'&& <>
        
    
    {cargoItems && Object.values(
      cargoItems.reduce((acc, cargoItem) => {
        const order = cargoItem.order;
        if (order) {
          const itemNames = Object.keys(order);
          itemNames.forEach(itemName => {
            const item = order[itemName];
            const id = item.id;

            if (!acc[id]) acc[id] = [];

            acc[id].push(item);
          });
        }

        return acc;
      }, {})
    )
    .map(items => (
      <div key={items[0].id} className={`${  items[0].status !=='ready for transport'  && items[0].status !== 'Driver Accepted - Package On the way'? 'hidden':'flex items-start bg-slate-900 shadow-card gap-4 p-4 rounded-md hover:shadow-dark-effect'}`}>  
        {items.map(item => {
     
            return (
              <div key={item.name} className='flex flex-col gap-y-2 items-start  '>
                <h2>{item.name}</h2>
                <p>Status: {item.status}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
                <p>Delivery date: {item.delivery}</p>
                <p>Driver: {item.driver}</p>
                <p>Send on: {item.sendOn?.toDate().toString()}</p>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1  px-2 mt-2 rounded" onClick={() => {handleCancel(item.id,item.name,item.quantity)}}>Report issue</button>
              </div>
            );
   
  
        })}
        {items.some(item => item.status === 'Driver Accepted - Package On the way') && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mt-2 rounded" onClick={() => {
            items.forEach(item => {
              if ( item.status === 'Driver Accepted - Package On the way') {
                handleAccept(item.id,item.name,item.quantity);
              }
            });
          }}>Sign off</button>
        )}

{items.some(item => item.status === 'ready for transport') && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mt-2 rounded" onClick={() => {
            items.forEach(item => {
              if ( item.status === 'ready for transport') {
                handleDriver(item.id,item.name,item.quantity);
              }
            });
          }}>Accept ride</button>
        )}

      </div>
    ))}
        
        </>}
      </section>
    </div>
     </section>
   
  
  </div>
    
   </>)
}
    