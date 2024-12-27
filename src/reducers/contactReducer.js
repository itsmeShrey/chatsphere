// reducers/contactReducer.js
const contactReducer = (state, action) => {
    console.log('Contact Reducer Action:', action); // Debugging log
    switch (action.type) {
        case 'SET_CONTACTS':
            return action.payload;
        case 'ADD_CONTACT':
            return [...state, action.payload];
        case 'DELETE_CONTACT':
            return state.filter((contact) => contact.id !== action.payload);
        default:
            return state;
    }
};

export default contactReducer;
