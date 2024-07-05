const {Op} = require('sequelize');
const Products = require('../models/Products');
const {decodeToken} = require('../util/helper');
const FavouriteProducts = require('../models/FavouriteProducts');

exports.getFavouriteProducts = async (req, res) => {
    try {
        const userId = decodeToken(req.get('Authorization') || '');
        let favProductArray = [];
        if (userId) {
            const favProducts = await FavouriteProducts.findAll({
                where: {
                    cust_id: userId
                }
            });
            favProductArray = await favProducts.map(product => product.product_id);
        } else {
            favProductArray = req.body;
        }
        const products = await Products.findAll({
            where: {
                product_id: {[Op.in]: favProductArray}
            }
        });
        return res.json({
            message: "Product fetch successfully",
            favouriteProducts: favProductArray,
            products
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getFavouriteProductsArray = async (req, res) => {
    try {
        const userId = decodeToken(req.get('Authorization') || '');
        let favProductArray = [];
        if (userId) {
            const favProducts = await FavouriteProducts.findAll({
                where: {
                    cust_id: userId
                }
            });
            favProductArray = await favProducts.map(product => product.product_id);
        }
        return res.json({
            favProductArray
        });
    } catch (err) {
        console.log(err);
    }
}

exports.postFavouriteProductRemove = async (req, res) => {
    try {
        const userId = decodeToken(req.get('Authorization') || '');
        if (userId) {
            await FavouriteProducts.destroy({
                where: {
                    cust_id: userId,
                    product_id: req.body.productId
                }
            });
            return res.json({
                message: 'product unlike done!'
            });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.postFavouriteProductAdd = async (req, res) => {
    try {
        const userId = decodeToken(req.get('Authorization') || '');
        if (userId) {
            const productExist = await FavouriteProducts.findOne({
                where: {
                    cust_id: userId,
                    product_id: req.body.productId
                }
            });
            if(!productExist){
                const product = new FavouriteProducts({
                    cust_id: userId,
                    product_id: req.body.productId
                });
                await product.save();
            }
            return res.json({
                message: 'product like done!'
            });
        }
    } catch (err) {
        console.log(err);
    }
}