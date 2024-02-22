/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {useState,useContext,useEffect} from 'react'
import { db } from '../../Firebase'
import { collection, serverTimestamp, updateDoc,doc,deleteDoc ,setDoc} from "firebase/firestore";
import Add from './Add';
import Filter from './Filter';
import TruckDriver from '../trucks/TruckDriver';
import SidePanel from '../panel/SidePanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HandleCrud from './HandleCrud';
import { WarehouseContext } from '../context/WarehouseContext';
import { Suspense,lazy} from 'react';



const Track = lazy(() => import('../cargo/Track'));



export default function mainwarehouse() {



const { items, totalCash ,setItems,setTotalCash} = useContext(WarehouseContext);


const [edit, setEdit] = useState(false);
const [currentPrice, setCurrentPrice] = useState('');
const [currentQuantity, setCurrentQuantity] = useState('');
const [currentName, setCurrentName] = useState('');
const [deleteItem, setDeleteitem] = useState(false);
const [filter, setFilter] = useState('');
const [currency, setCurrency] = useState('USD');
const [driver, setDriver] = useState([]);
const [ view, setView] = useState('Stock');
const [sendAmount, setSendAmount] = useState('');
// const [ newShipments, setNewShipments] = useState(false);
const [selected, setSelected] = useState('');
const [date, setDate] = useState('');
const [show, setShow] = useState(false);
const [title, setTitle] = useState('Main Warehouse');





// automate noti for low stock items
useEffect(() => {
  const count = items.filter(item => 'requestedBy' in item && item.requestedBy !== null).length;
  document.title = items.some(item => 'requestedBy' in item) ? ` ${count == 0 ? '' : count}  ${title}` : title;
  if (count > 0) {
    toast.info(`You have ${count} open requests`);
  }
}, [items,title]);





//zapier automation for a email to db automation

// zapier automation for a low qty to email automation




  return (
  <>  

  <section className='flex flex-row'>

<ToastContainer />
<SidePanel setView={setView} show={show} setShow={setShow} />

    {view === 'Stock' && <>
    <div className=''>
  <h1 className='text-3xl font-bold text-center mt-4'>Main warehouse location A</h1>
<div> 
  
   </div>
{view === 'Stock' && <div>
   <Filter setFilter={setFilter}/>
   <div className='grid grid-cols-3  gap-4 '>
        {items.map(item => {
          if (filter === ""|| item.price.toString().includes(filter) || item.name.toLowerCase().includes(filter.toLowerCase()))  {
           
            return (
              <div key={item.id} className={`${item.requestedOn? 'border-2 bg-slate-900 shadow-card border-white': ''}bg-slate-800 w-[400px] shadow-card p-4 m-4 rounded-md`}>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p>Price: {currency==="USD"? 'USD':'SRD'} {currency !== 'USD'? item.price * 36 : item.price}  </p>
                <p>Quantity: {item.quantity}</p>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded" onClick={() => {
                  setCurrentName(item.name);
                  setDeleteitem(true);
                }}>Delete</button>

                  <button className='bg-yellow-500 text-black p-1 font-light text-sm ml-10 rounded' onClick={() => {setEdit(true);
                    setCurrentPrice(item.price);
                    setCurrentName(item.name);
                    setCurrentQuantity(item.quantity)}} > edit </button> 
                <hr className='mt-2'/>
                <div className='flex items-center gap-2 mt-2'>
                <input type="number" placeholder="quantity" min='1'  max={item.quantity} className='w-[100px] text-black'  onChange={(e) => setSendAmount(e.target.value)}/>
                   </div>

                   <div className='mt-2'>
                    <hr />
                    <TruckDriver driver={driver} setDriver={setDriver} />
                    <h2 className='text-xl font-bold'>Assign to driver</h2>
                    <select name="driver" id="driver" className='w-[100px] text-black' onChange={(e) => setSelected(e.target.value)}>
                    <option value={item.name}>Please select a driver</option>
                      {driver.map((item) => {
                        return <option key={item.id} value={item.name} >{item.name}</option>
                         })}
                    </select>

                 <input type='date' className='w-[100px] text-black ml-4' value={date} onChange={(e) => {setDate(e.target.value)}}/>
                    </div>
                    <div className={`${item.requesting? 'block':'hidden'} mt-2`}>
                      
                      <hr />
                      <h2 className='text-sm '>Request</h2>
                      <h2 className='text-sm '>By : {item.requestedBy}</h2>
                      <h2 className='text-sm '>requestedBy : {item.requestedOn}</h2>
                      <h2 className='text-xl '>Due date : {item.dueDate}</h2>
                      <h2 className='text-xl '>Qty : {item.requesting}</h2>
                      <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2" onClick={() => {
                     const docRef = doc(db, 'Cargo', `${selected}-${date}`); // replace 'warehouse' with your collection name
                     const wareRef = doc(db, 'warehouse', item.name);
                     if(sendAmount <= item.quantity && selected !== "" && date !== ""){
                      toast.success('Order has been sent');
                      setDoc(docRef, {
                        ['order']:{
                      [item.name]:{
                        name: item.name,
                        driver: selected,
                      price: item.price,
                      quantity: Number(sendAmount),
                      delivery: date,
                      status: 'pending',
                      sendOn: serverTimestamp(),
                      id:`${selected}-${date}`,
                      }
                        }} ,{merge:true});

                        updateDoc(wareRef, {
                          quantity: item.quantity - Number(sendAmount),
                          updated:serverTimestamp(),
                          updatedBy:'user-name',
                          requesting : null,
                          requestedBy:null,
                          requestedOn: null
                        },{merge:true}); 
                      } else {
                        toast.error('Please enter a valid quantity')
                      }
                     
                }}>Send</button>
                    </div>
              </div>
            );
          }
        })}
      </div>

      <hr />
      {totalCash > 0 && <div className='bg-slate-800 w-[200px] p-4 m-4 rounded-md'>
        
          <h2 className="text-xl font-bold">Total Product Value</h2>
          <p> {currency !== "USD"?`SRD:${totalCash * 36}` : `USD ${totalCash}`}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mt-2 rounded" onClick={() => setCurrency(currency === "USD" ? "SRD" : "USD")}>Change Currency</button>
        </div>}

</div>}


<HandleCrud currentName={currentName} currentPrice={currentPrice} currentQuantity={currentQuantity} setCurrentPrice={setCurrentPrice} setCurrentQuantity={setCurrentQuantity} setEdit={setEdit} edit={edit} setDeleteitem={setDeleteitem} deleteItem={deleteItem} />
    </div>
    </>}


 
    {view === 'Add' && <Add setItems={setItems} items={items} />}
{view === 'Track' && <Track />}


  </section>

    </> )
}
