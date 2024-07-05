const {check, validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const {Op} = require("sequelize");
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {formatValidationErrors} = require('../util/helper');
const FavouriteProducts = require('../models/FavouriteProducts');

exports.register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: formatValidationErrors(errors)});
    }
    const bodyData = req.body;
    bcrypt.hash(bodyData.user_password, 12).then(hashPassword => {
        const user = new User({
            user_first_name: bodyData.user_first_name,
            user_last_name: bodyData.user_last_name,
            email: bodyData.email,
            password: hashPassword,
        });
        return user.save();
    }).then(result => {
        res.json({
            message: 'User signup successfully',
            userId: result.id
        })
    });
}

exports.validationRegister = [
    check('user_first_name').notEmpty().withMessage('First name is required.'),
    check('user_last_name').notEmpty().withMessage('Last name is required.'),
    check('email').custom((value) => {
        return User.findOne({
            where: {email: value, deleted_at: {[Op.is]: null}}
        }).then(user => {
            if (user) {
                return Promise.reject('Email already exists');
            }
        });
    }).isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required.'),
    check('user_password').isLength({min: 6}).withMessage('Password must be at least 6 characters').notEmpty().withMessage('Password is required.')
];

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: formatValidationErrors(errors)});
    }
    const isEqual = await bcrypt.compare(req.body.password, req.user.password)
    if (!isEqual) {
        return res.status(400).json({errors: {password: 'Invalid password'}});
    }
    //store favourite products
    const favouriteProducts = req.body.favouriteProducts || [];
    await storeFavouriteProducts(favouriteProducts, req.user.id);

    //generate token
    const token = jwt.sign({
        email: req.body.email, userId: req.user.id
    }, process.env.JWT_SECRET, {expiresIn: '1h'});
    return res.json({token, userId: req.user.id});
}

exports.validationLogin = [
    check('email').custom((value, {req}) => {
        return User.findOne({
            where: {email: value, user_status: 'A', deleted_at: {[Op.is]: null}}
        }).then(user => {
            if (!user) {
                return Promise.reject('Email does not exists');
            }
            req.user = user;
        });
    }).isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required.'),
    check('password').notEmpty().withMessage('Password is required.')
];

const storeFavouriteProducts = async (favouriteProducts, userId) => {
    if (favouriteProducts.length > 0) {
        const favouriteProductEntries = await Promise.all(favouriteProducts.map(async productId => {
            const productExist = await FavouriteProducts.findOne({
                where: {
                    product_id: productId,
                    cust_id: userId
                }
            });
            if (!productExist) {
                return {
                    product_id: productId,
                    cust_id: userId,
                };
            }
            return null;
        }));
        const validEntries = favouriteProductEntries.filter(entry => entry !== null);

        if (validEntries.length > 0) {
            await FavouriteProducts.bulkCreate(validEntries);
        }
    }
}