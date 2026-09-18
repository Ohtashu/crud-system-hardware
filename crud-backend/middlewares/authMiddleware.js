const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
      const authHeader = req.header('Authorization')
      if (!authHeader){
          return res.status(401).json({error: 'Access Denied. No token provided'});
      }
      const token = authHeader.split(' ')[1];

      if(!token){
          return res.status(401).json({ error: 'Access Denied. No token provided'});
      }
      try {
          req.user = jwt.verify(token, 'mySuperSecretKey')

          next();
      }
      catch (error){
          return res.status(400).json({ message: 'Invalid token', error});
      }
}
module.exports = {
    verifyToken
}