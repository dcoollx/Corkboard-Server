/* global express */
require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  let auth = req.get('Authorization');
  let [type, token] = auth.split(' ');
  if(type.toLowerCase() !== 'bearer')
    return res.status(401).json({error:'missing correct auth token'});
  if(!token)
    return res.status(401).json({error:'invalid auth token'});
  jwt.verify(token,process.env.JWT_SECERT,(err, decoded)=>{
    if(err)
      next(err);
    else{
      let {username} = decoded.payload.sub;
      req.app.get('db')('users').select('*').where().first()
        .then((result)=>{
          req.user = result;
          next();
        });
      
    }
  });
  next();
};