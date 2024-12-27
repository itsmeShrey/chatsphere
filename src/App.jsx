import React from "react";
import ChatWindow from "./components/ChatWindow"; // Import ChatWindow
import ContactList from "./components/ContactList"; // Import ContactList
import Header from "./components/Header"; // Import the Header component
import GlobalProvider from "./context/GlobalContext"; // Import the global context provider
import "./styles/app.css"; // Import app styles

const App = () => {
    return (
        <GlobalProvider>
            <div className="app">
                <Header /> {/* Add the Header component at the top */}
                <div className="content">
                    <ContactList /> {/* Contact List on the left */}
                    <ChatWindow /> {/* Chat Window on the right */}
                </div>
            </div>
        </GlobalProvider>
    );
};

export default App;
