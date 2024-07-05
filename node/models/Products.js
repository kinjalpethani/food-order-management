const Sequelize = require('sequelize');
const database = require('../util/database');

const Product = database.define('tbl_product', {
    product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tenant_id: {
        type: Sequelize.INTEGER,
    },
    product_name: Sequelize.STRING,
    product_price: Sequelize.DOUBLE(9,2),
    product_status: Sequelize.STRING,
    product_description: Sequelize.TEXT,
    product_image: Sequelize.STRING,
}, {
    freezeTableName: true, //will use the exact table name you specify (tbl_product) without trying to pluralize it.
    timestamps: false
});

module.exports = Product;