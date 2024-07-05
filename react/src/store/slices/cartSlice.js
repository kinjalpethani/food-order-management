import {createSlice} from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartVisible: false,
        selectedProduct : null
    },
    reducers: {
        showModal(state, action){
            state.cartVisible = true;
            state.selectedProduct = action.payload
        },
        hideModal(state){
            state.cartVisible = false;
        }
    }
});

export const cartActions = CartSlice.actions;
export default CartSlice;