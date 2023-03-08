const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async(req, res, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "There's no token in request"
        });
    }

    try {
        const {uid} = jwt.verify(token, "supersecreta");

        //Leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Invalid token, user does not exist'
            })
        }

        req.user = user;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })        
    }


}

module.exports = {
    validateJWT
}