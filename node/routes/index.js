const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const FavouriteProductController = require('../controllers/FavouriteProductController');
const AuthController = require('../controllers/AuthController');
const CartController = require('../controllers/CartController');

router.post('/register', AuthController.validationRegister, AuthController.register) ;
router.post('/login', AuthController.validationLogin, AuthController.login) ;

router.get('/products', ProductController.getProducts) ;
router.post('/favourite/list', FavouriteProductController.getFavouriteProducts) ;
router.get('/favourite/products', FavouriteProductController.getFavouriteProductsArray) ;
router.post('/favourite/unlike', FavouriteProductController.postFavouriteProductRemove) ;
router.post('/favourite/like', FavouriteProductController.postFavouriteProductAdd) ;

router.post('/cart/products/list', CartController.getCartProducts) ;

module.exports = router;