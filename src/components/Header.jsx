import React from "react";
import "../styles/header.css"; // Create this CSS file for styling

const Header = () => {
    return (
        <header className="header">
            <img
                src={require("../assets/chatgram.jpg")}
                alt="ChatSphere Logo"
                className="header-logo"
            />
            <h1 className="header-title">ChatGram</h1>
        </header>
    );
};

export default Header;
