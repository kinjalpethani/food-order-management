const Sequelize = require("sequelize");
const database = require('../util/database');

const User = database.define('tbl_customer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_first_name: {
        type: Sequelize.STRING(50),
        required: true
    },
    user_last_name: {
        type: Sequelize.STRING(50),
        required: true
    },
    email: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        required: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true, //will use the exact table name you specify (tbl_product) without trying to pluralize it.
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;