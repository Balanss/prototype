/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import  react,{useContext} from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../Firebase';


export default function TruckDriver({setDriver,driver}) {

    react.useEffect(() => {
        const fetchItems = async () => {
            const warehouseRef = collection(db, 'driver');
            const warehouseQuery = query(warehouseRef);
            const querySnapshot = await getDocs(warehouseQuery);

            setDriver(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchItems();
    }, []);

   

}