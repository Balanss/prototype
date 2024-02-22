/* eslint-disable no-unused-vars */
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

export default function Home() {
 
  const [name, setName] = useState('');
  const [password, setPassword] = useState();
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  //create a session storage that adds a name of store that contains 10 items as following item,price,qty create 10 items

  useEffect(() => {
    const store = JSON.parse(sessionStorage.getItem('store')) || [];
    if (store.length === 0) {
      const items = [];
      for (let i = 1; i <= 10; i++) {
        items.push({
          item: `Item ${i}`,
          price: 100 * i,
          qty: Number(10 * i)
        });
      }
      sessionStorage.setItem('store', JSON.stringify(items));
    }
  }, []);

 
  useEffect(() => {
    setName(sessionStorage.getItem('name'));
    if(name > ''){
      setCheck(true);
    }
  }, [name]);

  return (
    <>
    {!check? <Login setPassword={setPassword}  setCheck={setCheck} /> : <div className="flex flex-col items-center justify-center min-h-screen bg-custom-color">
      <h1 className="text-4xl text-white mb-4">Round Enterprises</h1>
      <p className="text-xl text-white mb-4">Hello, {name}</p>
      <form className="p-6 bg-white rounded shadow-md">
        <button type="button" onClick={() => handleNavigation('/mainwarehouse')} className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mb-2">Go to Main</button>
        <button type="button" onClick={() => handleNavigation('/trucks')} className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 mb-2">Go to Trucks</button>
        <button type="button" onClick={() => handleNavigation('/store')} className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700">Go to Store</button>
      </form>
    </div>}
    </>
  );
}