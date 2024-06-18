import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        { id: 1, name: 'Item 1', price: 10, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Item 2', price: 20, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Item 3', price: 30, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Item 4', price: 40, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Item 1', price: 10, image: 'https://via.placeholder.com/150' },
    ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
