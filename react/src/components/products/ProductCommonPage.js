import {useDispatch} from "react-redux";
import {cartActions} from "../../store/slices/cartSlice";
import {currencyFormatter} from '../../helpers/formatting';

export const ProductCommonPage = ({product, onProductLikeUnlike, favProducts}) => {
    const dispatch = useDispatch();
    const handleShowCart = () => {
        dispatch(cartActions.showModal(product));
    }
    return <>
        <div key={product.product_id}
             className="col-lg-4 col-md-4 col-sm-12 mb-3 product-box">
            <div className="favourite_item">
                <img src={require(`../../assets/products/${product.product_image}`)} alt=""/>
                <span className="unlike-btn" onClick={(e) => onProductLikeUnlike(e, product.product_id)}><img
                    src={`/assets/images/${favProducts.includes(product.product_id) ? 'blue-heart.png' : 'heart.png'}`}
                    alt=""/></span>
            </div>
            <div className="product_details">
                <div className="d-flex p-1 pt-2">
                    <h6>{product.product_name}</h6><span
                    className="ml-auto font-weight-bold">{currencyFormatter.format(product.product_price)}</span>
                </div>
                <div className="d-flex p-1">
                    <p>{product.product_description} </p>
                    <button className="ml-auto" onClick={handleShowCart}>
                        <img src="/assets/images/bag.png" className="mr-1" alt=""/>
                        Add
                    </button>
                </div>
            </div>
        </div>
    </>
}