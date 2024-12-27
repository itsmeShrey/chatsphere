import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import '../styles/chatWindow.css';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatWindow = () => {
    const { messages, selectedContact, contacts, theme } = useContext(GlobalContext);

    // Find the selected contact's details
    const selectedContactDetails = contacts?.find(
        (contact) => contact.id === selectedContact
    );

    // Filter messages for the selected contact
    const filteredMessages = messages.filter(
        (msg) => msg.contactId === selectedContact
    );

    return (
        <div className={`chat-window ${theme}`}>
            {selectedContact ? (
                <>
                    {/* Top Bar with Profile Picture and Call Buttons */}
                    <div className="chat-header">
                        <span className="contact-name">
                            {selectedContactDetails?.name || 'Unknown'}
                        </span>
                        <div className="call-buttons">
                            <button className="call-button voice-call" title="Voice Call">
                                <i className="fas fa-phone"></i>
                            </button>
                            <button className="call-button video-call" title="Video Call">
                                <i className="fas fa-video"></i>
                            </button>
                        </div>
                    </div>

                    {/* Messages Section */}
                    <div className="messages">
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((msg) => (
                                <Message key={msg.id} message={msg} />
                            ))
                        ) : (
                            <p className="no-messages">No messages yet!</p>
                        )}
                    </div>

                    {/* Message Input */}
                    <MessageInput />
                </>
            ) : (
                <p className="select-contact">Please select a contact to start chatting.</p>
            )}
        </div>
    );
};

export default ChatWindow;
