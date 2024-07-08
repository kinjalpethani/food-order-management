import {useEffect, useState} from "react";
import {fetchCartProducts} from "./products/ProductConfig";
import {NoData} from "./products/NoData";
import {currencyFormatter} from "../helpers/formatting";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../store/slices/cartSlice";

export const Cart = () => {
    const cartProducts = useSelector(state => state.cart.cartProducts);
    const [products, setProducts] = useState([]);
    const [productIds, setProductIds] = useState(cartProducts.map(product => product.product_id));
    const dispatch = useDispatch();
    let totalPrice = 0;

    useEffect(() => {
        const fetchProducts = async () => {
            await fetchCartProducts(setProducts, productIds);
        }
        fetchProducts();
    }, [productIds]);

    const increaseQuantity = (productId) => {
        dispatch(cartActions.addProductToCart({productId, quantity: 1}));
    }
    const decreaseQuantity = (productId, quantity) => {
        dispatch(cartActions.decreaseProductInCart({productId, quantity: quantity - 1}));
    }

    const removeProductFromCart = (productId) => {
        dispatch(cartActions.removeProductFromCart({productId}));

        //state immediately after dispatching an action may not give the updated state.
        // So I have used existing array and remove particular id
        const updatedCartProducts = cartProducts.filter(item => item.product_id !== productId);
        setProductIds(updatedCartProducts.map(product => product.product_id));
    }

    return <>
        <div className="col-lg-12 page-title d-flex">
            <h2><span className="font-bold">Cart</span></h2>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 cart-items">
            {products.length > 0 && (
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="added-item">
                            <ul className="border-right">
                                {products.map(product => {
                                    const quantity = cartProducts.find(item => item.product_id === product.product_id)?.quantity;
                                    totalPrice += product.product_price * quantity;
                                    return <li className="mb-3 border-bottom" key={product.product_id}>
                                        <a className="removeCart"
                                           onClick={() => removeProductFromCart(product.product_id)}><img
                                            src="assets/images/close.png" alt=""
                                            className="close"/></a>
                                        <img src={require(`../assets/products/${product.product_image}`)}
                                             className="added-cart-item mr-3" align="left" alt=""/>
                                        <h6>{product.product_name}</h6>
                                        <p>{product.product_description} </p>
                                        <div className="d-flex mt-4">
                                            <span>
                                                <h5>{currencyFormatter.format(product.product_price * quantity)}</h5>
                                            </span>
                                            <div className="ml-auto item-counter">
                                                <button className="cart_minus"
                                                        onClick={() => decreaseQuantity(product.product_id, quantity)}
                                                        disabled={quantity === 1}><img
                                                    src="assets/images/minus.png" alt=""/></button>
                                                <span>{quantity}</span>
                                                <button className="cart_plus"
                                                        onClick={() => increaseQuantity(product.product_id)}
                                                        disabled={quantity === 10}><img
                                                    src="assets/images/plus.png" alt=""/></button>
                                            </div>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="order_summary">
                            <h6>ORDER SUMMARY</h6>
                            <ul>
                                <li className="d-flex border-bottom mb-1">
                                    <h6>Item Total</h6>
                                    <span className="ml-auto">{currencyFormatter.format(totalPrice)}</span>
                                </li>
                                <li className="d-flex mt-4">
                                    <h6>Sub Total</h6>
                                    <span className="ml-auto">{currencyFormatter.format(totalPrice)}</span>
                                </li>
                                <NavLink to="/">
                                    <button className="col-lg-12 col-md-12 col-sm-12 border-radius-15 mt-2">
                                        Make Payment
                                    </button>
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {products.length === 0 && <NoData>Your cart is empty</NoData>}
        </div>
    </>
}