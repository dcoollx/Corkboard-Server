const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const jwt = require('jsonwebtoken');
require('dotenv').config();

Router.post('/',parser,(req, res, err)=>{
  let {user_name, password, org} = req.body;
  console.log(req.body);
  if(!user_name || !password || !org)
    return res.status(401).json({error:'must have username, password and org'});

  dbService.getByName(req.app.get('db'),'user',user_name).then(query=>{
    if(query.rows.length <= 0 )
      return res.status(401).json({error:'invalid username or password'});
    else{
      dbService.getByName(req.app.get('db'),'orgs',org).then((db_search)=>{
        if(db_search.rows.length <= 0)
          return res.status(401).json({error:'org not found'});
        else{
          let org = db_search.rows[0];
          let user = query.rows[0];
          //bcrypt.verify(password,user.password)
          if(user.password === password)
            return res.status(200).json({Auth:jwt.sign({org:org.id,sub: user.id},process.env.JWT_SECERT)});
          else 
            return res.status(401).json({error:'invalid username or password'});
        }
      });

    }
    
  });
});

module.exports=Router;