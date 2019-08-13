const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

Router.post('/',parser,(req, res, err)=>{
  let timer =0;
  let test = setTimeout(()=>++timer,1000);
  let {user_name, password} = req.body;
  if(!user_name || !password)
    return res.status(401).json({error:'must have username, password'});

  dbService.getByName(req.app.get('db'),'users',user_name).then(user=>{  
    if(!user)
      return res.status(401).json({error:'invalid username or password'});
    else{
      dbService.getOrgById(req.app.get('db'),user.org).then(org=>{
        if(!org.id)
          return res.status(401).json({error:'org not found'});
        else{
          bcrypt.compare(password,user.password).then(matches=>{
            if(matches){
              jwt.sign({org_name: org.org_name,org:org.id,sub: user.id},process.env.JWT_SECERT,(err,token)=>{
                if(err)
                  throw err;
                else{
                  return res.status(200).json({Auth:token});
                }
              });
            }
            else 
              return res.status(401).json({error:'invalid username or password'});
          });
        }
      }).catch(err);

    }
    
  }).catch(err);
});

module.exports=Router;