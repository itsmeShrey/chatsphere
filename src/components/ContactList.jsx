import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import useIndexedDB from '../hooks/useIndexedDB';
import '../styles/contactList.css';

const ContactList = () => {
    const { contacts, dispatchContacts, selectedContact, setSelectedContact } = useContext(GlobalContext);
    const { getFromDB, addToDB, deleteFromDB, updateInDB } = useIndexedDB();
    const [newContactName, setNewContactName] = useState('');
    const [newContactPic, setNewContactPic] = useState('');
    const [newContactPhone, setNewContactPhone] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [archivedContacts, setArchivedContacts] = useState([]);
    const [theme, setTheme] = useState('light');
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [pinnedContacts, setPinnedContacts] = useState([]);

    // Close options menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.contact-options') && !event.target.closest('.contact-pic-container')) {
                setShowOptions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Fetch contacts from IndexedDB or static data
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const storedContacts = await getFromDB('contacts');
                if (storedContacts.length) {
                    dispatchContacts({ type: 'SET_CONTACTS', payload: storedContacts });
                } else {
                    const contactData = [
                        { id: 1, name: 'Garvita', phone: '1234567890', pic: '' },
                        { id: 2, name: 'Heena', phone: '9876543210', pic: '' },
                        { id: 3, name: 'Sayani', phone: '1112223333', pic: '' },
                        { id: 4, name: 'Aarav', phone: '4445556666', pic: '' },
                        { id: 5, name: 'Ananya', phone: '7778889999', pic: '' },
                        { id: 6, name: 'Rohan', phone: '5554443333', pic: '' },
                        { id: 7, name: 'Priya', phone: '9998887777', pic: '' },
                        { id: 8, name: 'Sahil', phone: '2223334444', pic: '' },
                        { id: 9, name: 'Neha', phone: '6667778888', pic: '' },
                        { id: 10, name: 'Vishal', phone: '3332221111', pic: '' },
                        { id: 11, name: 'Nisha', phone: '8889990000', pic: '' },
                        { id: 12, name: 'Ishaan', phone: '1231231234', pic: '' },
                        { id: 13, name: 'Tanya', phone: '3213214321', pic: '' },
                        { id: 14, name: 'Aditi', phone: '4443332222', pic: '' },
                        { id: 15, name: 'Karan', phone: '7776665555', pic: '' },
                        { id: 16, name: 'Sonia', phone: '2221110000', pic: '' },
                        { id: 17, name: 'Ravi', phone: '5556667777', pic: '' },
                        { id: 18, name: 'Meera', phone: '8880009999', pic: '' },
                        { id: 19, name: 'Arjun', phone: '1112221111', pic: '' },
                        { id: 20, name: 'Simran', phone: '4445553333', pic: '' },
                        { id: 21, name: 'Ritika', phone: '3334445555', pic: '' },
                        { id: 22, name: 'Shivansh', phone: '6665554444', pic: '' },
                        { id: 23, name: 'Aman', phone: '9998887776', pic: '' },
                        { id: 24, name: 'Divya', phone: '1233211234', pic: '' },
                        { id: 25, name: 'Sakshi', phone: '4321432143', pic: '' },
                        { id: 26, name: 'Harsh', phone: '5553332222', pic: '' },
                        { id: 27, name: 'Komal', phone: '1110001110', pic: '' },
                        { id: 28, name: 'Vivek', phone: '7775553333', pic: '' },
                        { id: 29, name: 'Swati', phone: '4442223333', pic: '' },
                        { id: 30, name: 'Nikhil', phone: '9991112222', pic: '' },
                    ];


                    contactData.forEach((contact) => addToDB('contacts', contact));
                    dispatchContacts({ type: 'SET_CONTACTS', payload: contactData });
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, [dispatchContacts, getFromDB, addToDB]);

    // Add a new contact
    const handleAddContact = async () => {
        if (newContactName.trim()) {
            const newContact = {
                id: Date.now(),
                name: newContactName,
                pic: newContactPic || '',
            };
            await addToDB('contacts', newContact);
            dispatchContacts({ type: 'ADD_CONTACT', payload: newContact });
            setNewContactName('');
            setNewContactPic('');
            setNewContactPhone('');
            setShowForm(false);
        }
    };

    // Delete a contact
    const handleDeleteContact = async (id) => {
        await deleteFromDB('contacts', id);
        dispatchContacts({ type: 'DELETE_CONTACT', payload: id });
    };

    // Archive contact
    const handleArchiveContact = (contact) => {
        setArchivedContacts((prev) => [...prev, contact]);
        handleDeleteContact(contact.id);
    };

    // Show contact options
    const handleProfileClick = (contact) => {
        setSelectedContact(contact.id);
        setShowOptions(true);
    };

    // Edit contact
    const handleEditContact = (id) => {
        const contactToEdit = contacts.find((contact) => contact.id === id);
        if (contactToEdit) {
            setNewContactName(contactToEdit.name);
            setNewContactPhone(contactToEdit.phone);
            setNewContactPic(contactToEdit.pic);
            setShowForm(true);
        }
        setShowOptions(false);
    };

    const handlePin = (contact) => {
        if (pinnedContacts.includes(contact.id)) {
            // Unpin the contact
            setPinnedContacts(pinnedContacts.filter((id) => id !== contact.id));
        } else {
            // Pin the contact
            setPinnedContacts([...pinnedContacts, contact.id]);
        }
    };

    const sortedContacts = [
        ...contacts.filter((contact) => pinnedContacts.includes(contact.id)),
        ...contacts.filter((contact) => !pinnedContacts.includes(contact.id))
    ];

    // Update the contact's name
    const handleUpdateContact = async () => {
        if (newContactName.trim() && selectedContact) {
            const updatedContact = {
                id: selectedContact,
                name: newContactName,
                phone: newContactPhone,
                pic: newContactPic || '',
            };
            await updateInDB('contacts', updatedContact);
            dispatchContacts({ type: 'UPDATE_CONTACT', payload: updatedContact });
            setNewContactName('');
            setNewContactPhone('');
            setNewContactPic('');
            setShowForm(false);
        }
    };

    // Always create a new contact when clicking the ➕ button
    const handleAddContactClick = () => {
        setSelectedContact(null);
        setNewContactName('');
        setNewContactPic('');
        setShowForm(true);
    };

    // Filter contacts based on search query
    const filteredContactsList = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`contact-list ${theme}`}>
            {/* Archived Contacts Section */}
            {showArchived && (
                <div className="archived-contacts">
                    <h3>Archived Contacts</h3>
                    <div id="archivedItems">
                        {archivedContacts.map((contact) => (
                            <div key={contact.id} className="contact-item">
                                <div className="contact-pic-container">
                                    {contact.pic ? (
                                        <img src={contact.pic} alt={contact.name} className="contact-pic" />
                                    ) : (
                                        <div className="contact-initial">
                                            {contact.name[0].toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="contact-info">
                                    <span className="contact-name">{contact.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Contact List Header */}
            <div className="contact-list-header">
                <h2>Chats</h2>
                <span className="add-contact-icon" onClick={handleAddContactClick}>
                    ➕
                </span>
                <span className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    🌗
                </span>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search contacts"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>

            {/* Add/Edit Contact Form */}
            {showForm && (
                <div className="add-contact-form">
                    <input
                        type="text"
                        placeholder="Enter contact name"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={newContactPhone}
                        onChange={(e) => setNewContactPhone(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter profile picture URL (optional)"
                        value={newContactPic}
                        onChange={(e) => setNewContactPic(e.target.value)}
                    />
                    {selectedContact ? (
                        <button onClick={handleUpdateContact}>Update Contact</button>
                    ) : (
                        <button onClick={handleAddContact}>Add Contact</button>
                    )}
                </div>
            )}

            {/* Contact List */}
            <div className="contact-list-container">
                {sortedContacts.map((contact) => (
                    <div
                        key={contact.id}
                        className={`contact-item ${selectedContact === contact.id ? 'selected' : ''}`}
                        onClick={() => setSelectedContact(contact.id)}
                    >
                        <div className="contact-pic-container" onClick={() => handleProfileClick(contact)}>
                            {contact.pic ? (
                                <img src={contact.pic} alt={contact.name} className="contact-pic" />
                            ) : (
                                <div className="contact-initial">{contact.name[0].toUpperCase()}</div>
                            )}
                        </div>
                        <div className="contact-info">
                            <span className="contact-name">{contact.name}</span>
                            <span className="contact-phone">{contact.phone}</span>
                            <button
                                className={`pin-button ${pinnedContacts.includes(contact.id) ? 'pinned' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering onClick of the contact
                                    handlePin(contact);
                                }}
                            >
                                <span role="img" aria-label="pin" className="pin-icon">
                                    {pinnedContacts.includes(contact.id) ? '        💖' : '        📌'}
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Contact Options Menu */}
            {showOptions && selectedContact && (
                <div className="contact-options">
                    <button onClick={() => handleEditContact(selectedContact)}>Edit Contact</button>
                    <button onClick={() => handleDeleteContact(selectedContact)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default ContactList;
