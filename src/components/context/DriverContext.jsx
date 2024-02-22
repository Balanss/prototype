import React, { createContext, useContext, useState } from 'react';

// Create a context
const driver = createContext();

// Create a provider component
export function DriverContext({ children }) {
    const [selectedDriver,setSelectedDriver] = useState("empty driver");

    return (
        <driver.Provider value={{ selectedDriver,setSelectedDriver }}>
            {children}
        </driver.Provider>
    );
}

// Create a hook to use the context
export function useDriver() {
    return useContext(driver);
}