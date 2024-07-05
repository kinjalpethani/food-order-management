import {CommonTab} from "./layouts/CommonTab";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Base64} from "js-base64";
import {ProductCommonPage} from "./products/ProductCommonPage";
import {NoData} from "./products/NoData";
import {
    fetchFavouriteProducts,
    getFavProductFromCookie,
    getFavProductFromDB, productUnlike,
    storeProductsCookie,
} from './products/ProductConfig';
import {getToken} from "../helpers/config";
import {useSelector} from "react-redux";
import {Cart} from "./products/Cart";

export const FavouriteProducts = () => {
    const [products, setProducts] = useState([]);
    const [favouriteProducts, setFavouriteProducts] = useState(getFavProductFromCookie());
    const [prodUnlike, setProductUnlike] = useState(false);

    useEffect(() => {
        fetchFavouriteProducts(setProducts, setFavouriteProducts, favouriteProducts);
    }, [prodUnlike]);

    const unlikeProductHandler = async (e, productId) => {
        const updatedFavProducts = favouriteProducts.filter(id => id !== productId);
        setFavouriteProducts(updatedFavProducts);
        if (!getToken()) {
            storeProductsCookie(updatedFavProducts);
        } else {
            await productUnlike(productId);
        }
        setProductUnlike(prevState => !prevState);
    };
    const cartShow = useSelector(state => state.cart.cartVisible);

    return <>
        <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row">
                <CommonTab/>
                <div className="col-lg-9 col-md-9 col-sm-12">
                    <div className="tab-pane fade show active" id="pills-Transaction-History" role="tabpanel"
                         aria-labelledby="pills-Transaction-History-tab">
                        <div className="col-lg-12">
                            <h6><span className="font-weight-500">Favourites</span></h6>
                        </div>
                        <div className="row mt-3">
                            {products.length > 0 && products.map(product => (
                                <ProductCommonPage key={product.product_id} product={product}
                                                   onProductLikeUnlike={unlikeProductHandler}
                                                   favProducts={favouriteProducts}/>
                            ))}
                            {products.length === 0 && <NoData>No Products Found</NoData>}
                        </div>
                        {cartShow && <Cart />}
                    </div>
                </div>
            </div>
        </div>
    </>
}