# ChatGram / ChatSphere

ChatGram (also known as ChatSphere) is a real-time chat application that enables users to send and receive messages instantly. The project is built with modern web technologies, offering a seamless and responsive user experience.

## Features

- Real-time messaging
- Local message storage using IndexedDB for offline capabilities
- Contact list management
- Responsive UI

## Technologies Used

- **Frontend**: React.js, CSS
- **Local Storage**: IndexedDB (via the `idb` library)
- **Backend**: InstantDB (for cloud storage of messages)

## Setup and Installation

### 1. Initialize the Project

npx create-react-app chatsphere
cd chatsphere

### 2. Install Dependencies

Install the required dependencies:


npm install axios idb instantdb


### 3. Set Up Environment Variables

To configure InstantDB, create a `.env` file at the root of the project with the following values:


REACT_APP_INSTANTDB_URL=<Your_InstantDB_URL>
REACT_APP_INSTANTDB_API_KEY=<Your_InstantDB_API_KEY>


Make sure to replace `<Your_InstantDB_URL>` and `<Your_InstantDB_API_KEY>` with the appropriate values from your InstantDB account.

### 4. IndexedDB Integration

The app uses the `idb` library to interact with **IndexedDB**, allowing contacts and messages to be stored locally for offline functionality. The relevant hooks are:

- `useIndexedDB.js`: Handles interaction with IndexedDB.
- `useInstantDB.js`: Manages communication with InstantDB for cloud storage.

### 5. Running the App

Run the following command to start the React development server:

npm start

Your app will be accessible at [http://localhost:3000](http://localhost:3000).

### 6. Project Features

- **Contact List**: Users can see their list of contacts in `ContactList.jsx`.
- **Chat Window**: The chat window is managed in `ChatWindow.jsx`, where users can send and receive messages.
- **Message Input**: Users can type and send messages via the `MessageInput.jsx` component.
- **Offline Mode**: The app stores messages locally using IndexedDB, enabling offline usage.
- **Global State Management**: Global state management is handled through `GlobalContext.js`, using reducers like `contactReducer.js` and `messageReducer.js` for managing contacts and messages.


## Acknowledgments

- **React.js**: [React](https://reactjs.org/)
- **IndexedDB**: [idb](https://github.com/jakearchibald/idb)
- **InstantDB**: [InstantDB](https://instantdb.dev/)
- **CSS**: Custom styles for responsive UI.


This README covers all aspects of your project setup, dependencies, and structure. You can add more sections if necessary, such as for specific configurations or troubleshooting.
