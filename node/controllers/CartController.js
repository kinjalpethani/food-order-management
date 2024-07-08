const {Op} = require('sequelize');
const Products = require('../models/Products');

exports.getCartProducts = async (req, res) => {
    try {
        let cartProductArray = [];
        cartProductArray = req.body;

        const products = await Products.findAll({
            where: {
                product_id: {[Op.in]: cartProductArray}
            }
        });

        return res.json({
            message: "Product fetch successfully",
            products
        });
    } catch (err) {
        console.log(err);
    }
}