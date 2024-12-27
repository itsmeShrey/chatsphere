import React, { createContext, useReducer, useState } from 'react';
import contactReducer from '../reducers/contactReducer';
import messageReducer from '../reducers/messageReducer';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [contacts, dispatchContacts] = useReducer(contactReducer, []);
    const [messages, dispatchMessages] = useReducer(messageReducer, []);
    const [selectedContact, setSelectedContact] = useState(null);
    const [theme, setTheme] = useState('light'); // Track selected contact

    return (
        <GlobalContext.Provider
            value={{
                contacts,
                dispatchContacts,
                messages,
                dispatchMessages,
                selectedContact,
                setSelectedContact,
                theme,
                setTheme,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
