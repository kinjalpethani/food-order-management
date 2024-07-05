import {Modal} from "../inputs/Modal";
import {useDispatch, useSelector} from "react-redux";
import {currencyFormatter} from "../../helpers/formatting";
import {cartActions} from "../../store/slices/cartSlice";

export const Cart = () => {
    const cartShow = useSelector(state => state.cart.cartVisible);
    const product = useSelector(state => state.cart.selectedProduct);
    const dispatch = useDispatch();
    const handleHideCart = () => {
        dispatch(cartActions.hideModal());
    }
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
                                <button className="minus"><img
                                    src="/assets/images/minus.png"
                                    alt=""/></button>
                                <span className="total_quantity">1</span>
                                <button className="plus"><img
                                    src="/assets/images/plus.png"
                                    alt=""/></button>
                            </div>
                        </div>
                        <button
                            className="col-lg-12 col-md-12 col-sm-12 border-radius-15">Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}