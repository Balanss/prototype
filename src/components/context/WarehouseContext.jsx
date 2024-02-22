import React, { createContext, useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Firebase';


// Create the context
export const WarehouseContext = createContext();

export function WarehouseProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalCash, setTotalCash] = useState(0);
  const [speaking, setSpeaking] = useState('waiting');


  useEffect(() => {
    const fetchItems = () => {
      const warehouseRef = collection(db, 'warehouse');
      const warehouseQuery = query(warehouseRef);
      const unsubscribe = onSnapshot(warehouseQuery, (querySnapshot) => {
        const newItems = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setItems(newItems);

        const total = querySnapshot.docs.reduce((acc, doc) => acc + doc.data().price * doc.data().quantity, 0);
        setTotalCash(total);
      });

      return () => unsubscribe();
    };

    fetchItems();
  }, []);

  const value = useMemo(() => ({ items, totalCash, setItems, setTotalCash }), [items, totalCash]);

  // Provide the items and totalCash to children
  return (
    <WarehouseContext.Provider value={value}>
      {children}
    </WarehouseContext.Provider>
  );
}