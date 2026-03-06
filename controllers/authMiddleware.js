const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req , res , next) =>{
    try {
        const token = req.headers.authorization;

        if(!token){
          return res.status(401).json({message :"access denied.."});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
  

        next();
      
    } catch (error) {
      res.status(500).json({Error:error.message});
    }
}