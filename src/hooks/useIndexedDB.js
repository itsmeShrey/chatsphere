// useIndexedDB.js

import { openDB } from 'idb';

const useIndexedDB = () => {
    // Initialize the database
    const initDB = async () => {
        return openDB('WhatsAppClone', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('contacts')) {
                    db.createObjectStore('contacts', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('messages')) {
                    db.createObjectStore('messages', { keyPath: 'id' });
                }
            },
        });
    };

    // Fetch all data from a store
    const getFromDB = async (storeName) => {
        const db = await initDB();
        return db.getAll(storeName);
    };

    // Add or update data in a store
    const addToDB = async (storeName, data) => {
        const db = await initDB();
        return db.put(storeName, data); // `put` can add or update records
    };

    // Update data in a store
    const updateInDB = async (storeName, updatedData) => {
        const db = await initDB();
        return db.put(storeName, updatedData); // `put` is used to update the record
    };

    // Delete data from a store
    const deleteFromDB = async (storeName, id) => {
        const db = await initDB();
        return db.delete(storeName, id);
    };

    return { getFromDB, addToDB, deleteFromDB, updateInDB };
};

export default useIndexedDB;
