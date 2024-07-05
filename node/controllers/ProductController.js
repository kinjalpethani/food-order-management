const {Op} = require('sequelize');
const Products = require('../models/Products');

exports.getProducts = (req, res) => {
    Products.findAll({
        where: {
            product_status: 'A',
            deleted_at: {[Op.is]: null}
        }
    }).then(products => {
        res.json({
            message: "Product fetch successfully",
            products
        });
    }).catch(err => console.log(err));
}