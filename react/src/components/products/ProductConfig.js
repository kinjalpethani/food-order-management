import Cookies from "js-cookie";
import {Base64} from "js-base64";
import Config, {getToken} from "../../helpers/config";

export const storeProductsCookie = (FavProducts) => {
    Cookies.set('favouriteProducts', Base64.encode(JSON.stringify(FavProducts)), {expires: 7, path: '/'});
}

export const getFavProductFromCookie = () => {
    let favProductArray = Cookies.get('favouriteProducts') || [];
    if (favProductArray.length > 0) {
        favProductArray = JSON.parse(Base64.decode(favProductArray));
    }
    return favProductArray;
}

export const fetchFavouriteProducts = async (setProducts, setFavouriteProducts, favouriteProducts = []) => {
    const {http} = Config();
    const response = await http.post('/favourite/list', favouriteProducts);
    setProducts(response.data.products);
    setFavouriteProducts(response.data.favouriteProducts);
}
export const getFavProductFromDB = async () => {
    let favProductArray = [];
    if (getToken()) {
        const {http} = Config();
        const response = await http.get('/favourite/products');
        favProductArray = response.data.favProductArray;
    }
    return favProductArray;
}

export const productUnlike = async (productId) => {
    const {http} = Config();
    await http.post('/favourite/unlike', JSON.stringify({
        productId
    }));
}

export const productLike = async (productId) => {
    const {http} = Config();
    await http.post('/favourite/like', JSON.stringify({
        productId
    }));
}