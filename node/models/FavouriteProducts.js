const Sequelize = require('sequelize');
const database = require('../util/database');

const FavouriteProducts = database.define('tbl_favourite_product', {
    fav_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id : {
        type: Sequelize.INTEGER,
        required: true
    },
    cust_id: {
        type: Sequelize.INTEGER,
        required: true
    },
    created_at:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
    timeStamp: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = FavouriteProducts;