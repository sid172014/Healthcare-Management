const jwt = require('jsonwebtoken');
const { verifyPatient } = require('../db/database');

const authMiddleware = async (req, res, next) => {
    try {
        const token =  req.headers.authorization;

        console.log(token);
        const data = token.split(' ');

        const jwtData =jwt.verify(data[1], 'secret');

        const searchDb = await verifyPatient({
            email : jwtData.email,
            password : jwtData.password
        });
        if(searchDb.length === 0){
            throw new Error("Invalid Authorization");
        };
        req.user = searchDb[0];
        next();
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
};

module.exports = authMiddleware;