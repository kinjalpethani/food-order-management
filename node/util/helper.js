const jwt = require('jsonwebtoken');

const formatValidationErrors = (errors) => {
    return errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
    }, {});
};

const decodeToken = (authToken) => {
    if (authToken) {
        const token = authToken.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken) {
            return decodedToken.userId;
        }
    }
    return null;
};

module.exports = {
    formatValidationErrors,
    decodeToken
};
