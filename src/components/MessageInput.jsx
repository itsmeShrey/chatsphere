import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import useIndexedDB from '../hooks/useIndexedDB';
import '../styles/messageInput.css';


const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😜', '🤪', '😝', '🤑', '🤗', '🤔', '🤭', '🤫', '🤥',
    '😶', '😐', '😑', '😏', '😒', '🙄', '😬', '🤥', '😪', '😴',
    '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '😵', '🤯',
    '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲',
    '😳', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😱',
    '😨', '😰', '😥', '😓', '🤩', '😵‍💫', '🥳', '😏', '😒', '🙃',
    '🙈', '🙉', '🙊', '🐵', '🐒', '🦍', '🐶', '🐕', '🦮', '🐕‍🦺',
    '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '🐈‍⬛', '🦁', '🐯', '🐅',
    '🐆', '🐴', '🐎', '🦄', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖',
    '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🦏'
];

const mockContacts = [
    { id: 1, name: 'Rajesh Kumar', number: '+91-9876543210' },
    { id: 2, name: 'Priya Sharma', number: '+91-9876543211' },
    { id: 3, name: 'Amit Verma', number: '+91-9876543212' },
    { id: 4, name: 'Sneha Gupta', number: '+91-9876543213' },
    { id: 5, name: 'Rohit Singh', number: '+91-9876543214' },
    { id: 6, name: 'Pooja Mehta', number: '+91-9876543215' },
    { id: 7, name: 'Vikram Chawla', number: '+91-9876543216' },
    { id: 8, name: 'Anjali Nair', number: '+91-9876543217' },
    { id: 9, name: 'Kunal Deshmukh', number: '+91-9876543218' },
    { id: 10, name: 'Neha Patil', number: '+91-9876543219' },
    { id: 11, name: 'Akash Tripathi', number: '+91-9876543220' },
    { id: 12, name: 'Meera Iyer', number: '+91-9876543221' },
    { id: 13, name: 'Manoj Agarwal', number: '+91-9876543222' },
    { id: 14, name: 'Nisha Kapoor', number: '+91-9876543223' },
    { id: 15, name: 'Deepak Bhatt', number: '+91-9876543224' },
    { id: 16, name: 'Sakshi Malhotra', number: '+91-9876543225' },
    { id: 17, name: 'Arjun Reddy', number: '+91-9876543226' },
    { id: 18, name: 'Kavita Joshi', number: '+91-9876543227' },
    { id: 19, name: 'Mohit Rao', number: '+91-9876543228' },
    { id: 20, name: 'Divya Pillai', number: '+91-9876543229' },
];

const MessageInput = () => {
    const [input, setInput] = useState('');
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showContactPicker, setShowContactPicker] = useState(false);
    const { dispatchMessages, selectedContact } = useContext(GlobalContext);
    const { addToDB } = useIndexedDB();
    const attachmentMenuRef = useRef(null);
    const textareaRef = useRef(null);


    const handleSend = async () => {
        if (!selectedContact || !input) return;

        const newMessage = {
            id: Date.now(),
            text: input,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString(),
            contactId: selectedContact,
        };

        try {
            await addToDB('messages', newMessage);
            dispatchMessages({ type: 'ADD_MESSAGE', payload: newMessage });
            setInput('');
            setShowAttachmentMenu(false);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
    };

    const handleEmojiClick = (emoji) => {
        setInput((prev) => prev + emoji);
        setShowEmojiPicker(false); // Close emoji picker after selecting an emoji
    };

    const handleContactClick = (contact) => {
        const contactInfo = `${contact.name}\n${contact.number}`;
        setInput((prev) => `${prev}\n${contactInfo}`);
        setShowContactPicker(false); // Close contact picker after selection
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                attachmentMenuRef.current &&
                !attachmentMenuRef.current.contains(event.target)
            ) {
                setShowAttachmentMenu(false);
                setShowEmojiPicker(false);
                setShowContactPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="message-input">
            <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message"
                style={{
                    resize: 'none',
                    overflowY: 'auto', // Scrollbar will appear when content exceeds the height
                    minHeight: '40px', // Minimum height for a single line
                    maxHeight: '200px', // Limit the maximum height of the textarea
                    width: '100%',
                    fontSize: '16px',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    whiteSpace: 'pre-wrap', // Maintain spaces and line breaks
                }}
            />
            <button
                className="attachment-btn"
                onClick={() => setShowAttachmentMenu((prev) => !prev)}
            >
                📎
            </button>

            {showAttachmentMenu && (
                <div className="attachment-menu" ref={attachmentMenuRef}>
                    <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
                        😊 Emojis
                    </button>
                    <button onClick={() => setShowContactPicker((prev) => !prev)}>
                        📇 Share Contact
                    </button>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        style={{ display: 'none' }}
                        id="file-input"
                    />
                    <label htmlFor="file-input">
                        <button>📷 Upload</button>
                    </label>
                </div>
            )}

            {showEmojiPicker && (
                <div className="emoji-picker" ref={attachmentMenuRef}>
                    <h4>Emojis</h4>
                    <div
                        className="emoji-grid"
                        style={{
                            maxHeight: '200px',
                            maxWidth: '400px',
                            overflowY: 'auto',
                            padding: '5px',
                        }}
                    >
                        {emojis.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => handleEmojiClick(emoji)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    margin: '5px',
                                }}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {showContactPicker && (
                <div
                    className="contact-picker"
                    ref={attachmentMenuRef}
                    style={{
                        maxHeight: '200px',
                        maxWidth: '400px',
                        overflowY: 'auto',
                        background: '#f9f9f9',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '10px',
                        position: 'absolute',
                        zIndex: '100',
                    }}
                >
                    <h4>Select a Contact</h4>
                    {mockContacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => handleContactClick(contact)}
                            style={{
                                cursor: 'pointer',
                                padding: '5px',
                                borderBottom: '1px solid #eee',
                            }}
                        >
                            <div style={{ fontWeight: 'bold' }}>{contact.name}</div>
                            <div style={{ fontSize: '14px', color: '#555' }}>
                                {contact.number}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default MessageInput;
