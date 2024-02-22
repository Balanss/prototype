import  { useState } from 'react';

const AddItem = () => {
  const [qty, setQty] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    const newItem = { qty, item, price };
    const items = JSON.parse(sessionStorage.getItem('items')) || [];
    items.push(newItem);
    sessionStorage.setItem('items', JSON.stringify(items));
  };

  return (
 
 <form className='bg-white flex text-black flex-row mb-10 ml-5 p-2 rounded'>
    <div className='flex flex-row items-center'>
                    <label >Name: </label>
                    <input
                        type='text'
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder='Name'
                        className='bg-white'
                   
                    />
                    
    </div>
         
         <div className='flex flex-row items-center'>
                    <label >Quantity:</label>
                    <input
                        type='text'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        placeholder='Quantity'
                        className='bg-white'
                    
                    />
         </div>

                   <div className='flex flex-row items-center'>
                    <label >Price:</label>
                    <input
                        type='text'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price'
                        className='bg-white'
                      
                    />
                   </div>

                    <button onClick={handleAddItem} className='text-white bg-blue-500 p-4'>Add</button>
                </form>
 
  );
};

export default AddItem;
