import React, { useState, createContext } from 'react'

const AlertContext = createContext();


const AlertState = (props) => {
    const [alertMsg, setAlertMsg] = useState(null);

    // Method for showing alert message for alert  
    const showAlert = (alertMsg) => {

        setAlertMsg(alertMsg);

        setTimeout(() => {
            setAlertMsg(null);
        }, 5000);
    }


    return (
        <AlertContext.Provider value={{ alertMsg, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export { AlertContext, AlertState }; 