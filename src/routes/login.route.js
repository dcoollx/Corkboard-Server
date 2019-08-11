const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

Router.post('/',parser,(req, res, err)=>{
  let {user_name, password, org} = req.body;
  console.log(req.body);
  if(!user_name || !password || !org)
    return res.status(401).json({error:'must have username, password and org'});

  dbService.getByName(req.app.get('db'),'users',user_name).then(user=>{
    console.log('starting login');
    let timer = 0;
    let test = setTimeout(()=>timer++,1000);
    
    if(!user)
      return res.status(401).json({error:'invalid username or password'});
    else{
      dbService.getByName(req.app.get('db'),'orgs',org).then((db_search)=>{
        if(db_search.length <= 0)
          return res.status(401).json({error:'org not found'});
        else{
          let org = db_search;
          bcrypt.compare(password,user.password).then(matches=>{
            if(matches){
              console.log('finised login:', timer + 'seconds');
              clearTimeout(test);
              jwt.sign({org:org.id,sub: user.id},process.env.JWT_SECERT,(err,token)=>{
                if(err)
                  throw err;
                else
                  return res,status(200).json({Auth:token});
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