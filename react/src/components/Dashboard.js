import {useEffect, useState} from "react";
import Config, {getToken} from '../helpers/config';
import {ProductCommonPage} from "./products/ProductCommonPage";
import {NoData} from "./products/NoData";
import {
    getFavProductFromCookie,
    getFavProductFromDB,
    productLike,
    productUnlike,
    storeProductsCookie
} from "./products/ProductConfig";
import {Cart} from "./products/Cart";
import {useSelector} from "react-redux";

export const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [favProducts, setFavouriteProducts] = useState(getFavProductFromCookie());

    useEffect(() => {
        const fetchProducts = async () => {
            const {http} = Config();
            const response = await http.get('products');
            setProducts(response.data.products);
        }
        fetchProducts();
        const fetchFavouriteProducts = async () => {
            const favProducts = await getFavProductFromDB();
            setFavouriteProducts(favProducts);
        };
        if (getToken()) {
            fetchFavouriteProducts();
        }
    }, []);

    const productLikeUnlikeHandler = async (e, productId) => {
        let operation;
        let favouriteProductsArray = getToken() ? await getFavProductFromDB() : getFavProductFromCookie();
        if (favouriteProductsArray.includes(productId)) {
            favouriteProductsArray = favouriteProductsArray.filter(id => id !== productId);
            operation = 'unlike';
        } else {
            favouriteProductsArray.push(productId);
            operation = 'like';
        }
        if (!getToken()) {
            storeProductsCookie(favouriteProductsArray);
        } else {
            operation === 'like' ? await productLike(productId) : await productUnlike(productId);
        }
        setFavouriteProducts(favouriteProductsArray);
    }
    const cartShow = useSelector(state => state.cart.cartVisible);

    return <>
        <div className="col-lg-12 page-title d-flex">
            <h2><span className="font-bold">Products</span></h2>
        </div>
        <div className="products">
            <div className="row">
                {products.length > 0 && products.map(product => (
                    <ProductCommonPage key={product.product_id} product={product}
                                       onProductLikeUnlike={productLikeUnlikeHandler} favProducts={favProducts}/>

                ))}
                {products.length === 0 && <NoData>No Products Found</NoData>}
            </div>
            {cartShow && <Cart />}
        </div>
    </>
}