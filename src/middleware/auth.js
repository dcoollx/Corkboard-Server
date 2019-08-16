/* global express */
require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  let auth = req.get('Authorization');
  if(!auth)
    return res.status(401).json({error:'no auth token'});
  let [type, token] = auth.split(' ');
  if(type.toLowerCase() !== 'bearer')
    return res.status(401).json({error:'missing correct auth token'});
  if(!token)
    return res.status(401).json({error:'invalid auth token'});
  jwt.verify(token,process.env.JWT_SECERT,(err, decoded)=>{
    if(err)
      return res.status(401).json({error:'Invalid Credentials'});
    else{
      let id = decoded.sub;
      let org_id = decoded.org;
      req.app.get('db')('users').select('*').where({id}).first()
        .then(async (result) =>{
          let org = await  req.app.get('db')('orgs').select('*').where({id:org_id}).first()
          req.user = result;
          req.org= org;
          next();
        });
    }
  });
};