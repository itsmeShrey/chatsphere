// components/Message.js
import React from 'react';
import '../styles/chatWindow.css';

const Message = ({ message }) => {
    return (
        <div className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
            {/* Ensure that line breaks and spaces are preserved */}
            <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {message.text}
            </p>
            <span>{message.timestamp}</span>
        </div>
    );
};

export default Message;
