import {useState} from 'react'
import StorePanel from '../panel/StorePanel'
import { useCargo } from '../context/CargoContext';
import { db } from '../../Firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreTrack from './StoreTrack';
import StoreFunction from './StoreFunction';



export default function Store() {
  const [ view, setView ] = useState('Stock');
  const {cargoItems} = useCargo();
  const [items, setItems] = useState([]);
  const [totalCash, setTotalCash] = useState(0);
  const [request, setRequest] = useState(0);
  const [forStore, setForStore] = useState([]);
  const [date, setDate] = useState('');



  const handleRequest = async (name,qty,price) => {
   
    try {
      const cargoRef = doc(db, 'warehouse', name);
      await setDoc(cargoRef, {
        requesting: request,
        requestedBy: 'user',
        requestedOn: new Date().toString(),
        [`dueDate`]: date,
      }, {merge: true});

      toast.success('Request has been sent');

    } catch (error) {
      toast.error("404 Error");
    }
  }


  

  return (
    <div className='flex flex-row'>
      <StorePanel  setView={setView}/>
      <StoreFunction setItems={setItems} setTotalCash={setTotalCash} />
     
      {view === 'Stock' && <>
      <div className='w-[90vw] m-auto p-4'> 
       <h1 className='text-2xl'>Stock</h1>
        <section className='grid grid-cols-3 gap-2 ' >
        {items.map(item => (
          <div key={item.id} className='bg-slate-900 p-4  test shadow-card'>
            <h2>{item.name}</h2>
            <p>Quantity: {item.qty}</p>
            <p>Price: {item.price}</p>
          
            <hr className='mt-1 mb-1'/>
            <div className='flex flex-row gap-2'>
              <input className='text-black w-[100px]' type='number' placeholder='request how much' onChange={(e) => setRequest(e.target.value)} />
              <input className='text-black'  type='date'  placeholder='Select day' onChange={(e) => setDate(e.target.value)}/>
              <button className='px-2 rounded ml-2 bg-blue-500' onClick={() => handleRequest(item.name,item.qty,item.price)}> Request </button>
            </div>
            <hr className='mt-1 mb-1'/>

          </div>
        ))}
        </section>
      </div>
      
      </>}
      
      {view === 'Track' && <StoreTrack />}
      <ToastContainer />
    </div>
  )
}
