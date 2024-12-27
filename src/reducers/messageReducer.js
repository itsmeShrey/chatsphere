// reducers/messageReducer.js
const messageReducer = (state, action) => {
    console.log('Message Reducer Action:', action); // Debugging log
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default messageReducer;
