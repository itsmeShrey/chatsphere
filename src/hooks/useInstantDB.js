import axios from 'axios';

const useInstantDB = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_INSTANTDB_URL, // Use the URL from the .env file
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_INSTANTDB_API_KEY}`, // Use the API key from the .env file
        },
    });

    // Fetch messages for a contact
    const getMessages = async (contactId) => {
        try {
            const response = await instance.get(`/messages/${contactId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            return [];
        }
    };

    // Send a new message
    const sendMessage = async (message) => {
        try {
            const response = await instance.post('/messages', message);
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return { getMessages, sendMessage };
};

export default useInstantDB;
