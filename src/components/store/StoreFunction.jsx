/* eslint-disable no-unused-vars */
import  react from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Firebase';

export default function StoreFunction({setItems,setTotalCash}) {
   

    react.useEffect(() => {
        const fetchItems = () => {
            const warehouseRef = collection(db, 'stock');
            const warehouseQuery = query(warehouseRef);
            const unsubscribe = onSnapshot(warehouseQuery, (querySnapshot) => {
                setItems(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                const total = querySnapshot.docs.reduce((acc, doc) => acc + doc.data().price * doc.data().quantity, 0);
                setTotalCash(total);
            });

            return () => unsubscribe();
        };

        fetchItems();
    }, []);

}