import {Modal} from "../inputs/Modal";
import {useDispatch, useSelector} from "react-redux";
import {currencyFormatter} from "../../helpers/formatting";
import {cartActions} from "../../store/slices/cartSlice";
import {useEffect, useState} from "react";
import {getCartProductFromCookie} from "./ProductConfig";

export const CartPopup = () => {
    const [quantity, setQuantity] = useState(1);
    const [cartProducts] = useState(getCartProductFromCookie());
    const [action, setAction] = useState('add');

    const cartShow = useSelector(state => state.cart.cartVisible);
    const product = useSelector(state => state.cart.selectedProduct);
    const dispatch = useDispatch();
    const handleHideCart = () => {
        dispatch(cartActions.hideModal());
    }

    const addProductToCart = (product) => {
        if (action === 'add') {
            dispatch(cartActions.addProductToCart({productId: product.product_id, quantity}));
        } else {
            dispatch(cartActions.decreaseProductInCart({productId: product.product_id, quantity}));
        }
        dispatch(cartActions.hideModal());
    }
    const increaseQuantity = () => {
        setQuantity(preQty => preQty < 10 ? preQty + 1 : preQty);
        setAction('add');
    }
    const decreaseQuantity = () => {
        setQuantity(preQty => preQty > 1 ? preQty - 1 : preQty);
        setAction('remove');
    }

    useEffect(() => {
        if (cartProducts.length > 0) {
            const existingProductIndex = cartProducts.findIndex(items => items.product_id === product.product_id);
            if (existingProductIndex > -1) {
                setQuantity(cartProducts[existingProductIndex].quantity);
            }
        }
    }, [cartProducts, product]);

    return <Modal open={cartShow}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header p-0">
                    <button type="button" className="close" onClick={handleHideCart}>&times;</button>
                </div>

                <div className="modal-body p-0">
                    <div className="product-img">
                        <img src={require(`../../assets/products/${product.product_image}`)} alt=""/>
                    </div>
                    <div className="detail-box p-3">
                        <h5 className="mb-0">{product.product_name}</h5>
                        <p>{product.product_description} </p>
                        <div className="d-flex mt-3">
                        <span>
                            <span className="opacity-low">Total Price</span><br/>
                        <h5 className="display_price">{currencyFormatter.format(product.product_price)}</h5>
                        </span>
                            <div className="ml-auto item-counter">
                                <button className="minus" onClick={decreaseQuantity}><img
                                    src="/assets/images/minus.png"
                                    alt=""/></button>
                                <span className="total_quantity">{quantity}</span>
                                <button className="plus" onClick={increaseQuantity}><img
                                    src="/assets/images/plus.png"
                                    alt=""/></button>
                            </div>
                        </div>
                        <button onClick={() => addProductToCart(product)}
                                className="col-lg-12 col-md-12 col-sm-12 border-radius-15">Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}