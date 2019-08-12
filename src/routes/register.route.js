const Router = require('express').Router();
const bcrypt = require('bcryptjs');
const dbService = require('../services/service.db');
const parser = require('express').json();
const jwt = require('jsonwebtoken');
require('dotenv').config();

Router
  .post('/user',parser, (req,res,err)=>{//register a user
    let {user_name, password, org } = req.body;
    if(!user_name || !password || !org)
      return res.status(400).json({error:'must include user_name, password and org'});
    bcrypt.hash(password,10).then(password=>{
      dbService.createNew(req.app.get('db'),'users',{user_name,password,org})
        .then((newUser)=>{
          res.status(201).location(newUser.id).json(newUser);
        }).catch(err);
    });
   

  }).post('/org',(req,res,err)=>{ //register an org

  });


module.exports = Router;