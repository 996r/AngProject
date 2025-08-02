const { message } = require('statuses');
const {verifyToken} = require('./jwt.js');
const { decode } = require('punycode');

const authMiddleware  = (req, res, next) =>{
    const authHeader = req.header('Authorization');
    if(!authHeader) {
        return res.status(401).json({message: 'No token. Authorization denied'});
    }
    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message:'Token not found in header'});
    }

    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(401).json({message:'Token is not valid'});
    }
    req.user = decoded.user;
    next();
}

module.exports = authMiddleware;


