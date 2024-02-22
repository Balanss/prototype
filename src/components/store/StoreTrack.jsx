import React,{useState} from 'react'
import { useCargo } from '../context/CargoContext';
import { doc, serverTimestamp, updateDoc,setDoc, increment } from 'firebase/firestore';
import { db } from '../../Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StoreTrack() {
    const {cargoItems} = useCargo();
    const [proceed, setProceed] = useState(false);

  
      const handleCancel = (id,name,quantity) => {
        toast.success('notified the team that an issue has occured.');
      }
    

  return (
    <section>  


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
        )
        .map(items => (
          
          <div key={items[0].id} className={`${items[0].status === 'accepted' ? 'hidden' :'flex items-start bg-slate-900 shadow-card gap-4 p-4 rounded-md hover:shadow-dark-effect '}`} >
                            
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mt-2 rounded" onClick={() => {
        for (const item of items) {
  const cargoRef = doc(db, 'Cargo', item.id);
   updateDoc(cargoRef, {
    [`order.${item.name}.status`]: 'accepted',
    [`order.${item.name}.on`]: serverTimestamp(),
    [`order.${item.name}.signedOffBy`]: 'name',
  }, { merge: true });

  toast.success('store has accepted all orders and they have been signed off by the store manager.');

  const stockref = doc(db, 'stock', item.name);
   setDoc(stockref, {
    qty: increment(item.quantity),
  },{merge:true});
}
      }}>Sign off</button>

                  {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1  px-2 mt-2 rounded" onClick={() => {handleCancel(item.id,item.name,item.quantity)}}>Report issue</button> */}
            {items.map(item => 
           {
            if (item.status !== 'accepted') {
           
              return (
                <div key={item.name} className={`flex flex-col gap-y-2 `}>
                  <h2>{item.name}</h2>
                  <p>Status: {item.status}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                  <p>Delivery date: {item.delivery}</p>
                  <p>Driver: {item.driver}</p>
                  <p>Send on: {item.sendOn?.toDate().toString()}</p>
                </div>
              );
            } else {
              return null; // return null when item.status is 'accepted'
            }
           }
              
            )}
          </div>
          
        ))}

        
    
<ToastContainer />
  </section>
  )
}


