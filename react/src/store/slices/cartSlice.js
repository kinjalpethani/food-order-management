import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {Base64} from "js-base64";
import {getCartProductFromCookie} from "../../components/products/ProductConfig";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartVisible: false,
        selectedProduct: null,
        cartProducts: getCartProductFromCookie()
    },
    reducers: {
        showModal(state, action) {
            state.cartVisible = true;
            state.selectedProduct = action.payload
        },
        hideModal(state) {
            state.cartVisible = false;
        },
        addProductToCart(state, action) {
            const quantity = action.payload.quantity;
            const cartProducts = state.cartProducts;
            const existingProductIndex = cartProducts.findIndex(product => product.product_id === action.payload.productId);
            if (existingProductIndex > -1) {
                const existingProduct = cartProducts[existingProductIndex];
                cartProducts[existingProductIndex] = {
                    ...existingProduct,
                    quantity: quantity === 1 ? cartProducts[existingProductIndex].quantity + 1 : quantity
                };
            } else {
                cartProducts.push({
                    product_id: action.payload.productId,
                    quantity: quantity
                });
            }
            Cookies.set('cartProducts', Base64.encode(JSON.stringify(cartProducts)), {expires: 7, path: '/'});
        },

        decreaseProductInCart(state, action) {
            const cartProducts = state.cartProducts;
            const existingProductIndex = cartProducts.findIndex(product => product.product_id === action.payload.productId);
            if (existingProductIndex > -1) {
                const existingProduct = cartProducts[existingProductIndex];
                cartProducts[existingProductIndex] = {
                    ...existingProduct,
                    quantity: action.payload.quantity
                };
            }
            Cookies.set('cartProducts', Base64.encode(JSON.stringify(cartProducts)), {expires: 7, path: '/'});
        },
        removeProductFromCart(state, action) {
            const cartProducts = state.cartProducts;
            const existingProductIndex = cartProducts.findIndex(item => item.product_id === action.payload.productId);
            if (existingProductIndex > -1) {
                cartProducts.splice(existingProductIndex, 1);
                Cookies.set('cartProducts', Base64.encode(JSON.stringify(cartProducts)), { expires: 7, path: '/' });
            }
        }
    }
});

export const cartActions = CartSlice.actions;
export default CartSlice;