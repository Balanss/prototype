import React,{useState} from 'react'
import { useCargo } from '../context/CargoContext';

export default function Cargo({show,setView}) {

    const {cargoItems} = useCargo();
    const [hide, setHide] = useState(true);
  

  return (
    <>
   {show && cargoItems.map(cargoItem => {
    // Get the keys of the current cargoItem, excluding the 'id' key
    const keys = Object.keys(cargoItem).filter(key => key !== 'id') || [''];

    // Map over the keys
    return keys.map(key => {
      const item = cargoItem[key];
      const date = new Date(item.delivery.seconds * 1000);
       const dateString = date.toString();
      return (
        <div key={key} className='flex items-center gap-4 p-2' onClick={() => {setHide(prevHide => ({...prevHide,[key]: !prevHide[key]}))}}>
          <h2>{item.driver}</h2>
         {!hide[key] && <>
          <h2>{item.name}</h2>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
          <button onClick={() => setView('track')}>edit</button>
         </>}
          <p>{dateString}</p>
         
        </div>
      ) // or whatever property you want to access
    });
  })}
    </>
  )
}
