import { Suspense} from 'react';
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Store from './components/store/Store';
import Trucks from './components/trucks/Trucks';
import { DriverContext } from './components/context/DriverContext';
import { CargoContext } from './components/context/CargoContext';
import Main from './components/mainWharehouse/Main';







function App() {
  return (

    <BrowserRouter>
    <DriverContext>
      <CargoContext>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes> 
          <Route  path="/" element={<Home/>} />
          <Route path="/mainwarehouse" element={<Main/>} />
          <Route path="/trucks" element={<Trucks />} />
          <Route path="/store" element={<Store/>} />
      </Routes>
      </Suspense>
      </CargoContext>
       </DriverContext>  
    </BrowserRouter>
   
  );
}

export default App;