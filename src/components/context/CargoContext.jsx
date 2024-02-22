/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect,useMemo } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase';

// Create a context
const Cargo = createContext();

// Create a provider component
export function CargoContext({ children } ) {
    const [selectedCargo, setSelectedCargo] = useState("empty cargo");
    const [cargoItems, setCargoItems] = useState(['empty']);
   

    useEffect(() => {
        const cargoRef = collection(db, 'Cargo');
        const unsubscribe = onSnapshot(cargoRef, (snapshot) => {
            const cargoItems = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCargoItems(cargoItems);
          
        });
        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);



    //make a memoized value object
    const value = useMemo(() => ({ selectedCargo, setSelectedCargo, cargoItems }), [selectedCargo, cargoItems]);


    return (
        <Cargo.Provider value={value}>
            {children}
        </Cargo.Provider>
    );
}

// Create a hook to use the context
export function useCargo() {
    return useContext(Cargo);
}