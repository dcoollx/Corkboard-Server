const Router = require('express').Router();
const bcrypt = require('bcryptjs');
const dbService = require('../services/service.db');
const parser = require('express').json();
const jwt = require('jsonwebtoken');
require('dotenv').config();

Router
  .post('/user',parser, (req,res,err)=>{//register a user
    let {user_name, password, org, display_name, user_position } = req.body;
    if(!user_name || !password || !org || !user_position)
      return res.status(400).json({error:'must include user_name, password and org'});
    bcrypt.hash(password,10).then(password=>{
      dbService.createNew(req.app.get('db'),'users',{user_name,password,org,display_name, user_position})
        .then((newUser)=>{
          res.status(201).location(newUser.id).json(newUser);
        }).catch(err);
    });
   

  }).post('/orgs',parser, (req,res,err)=>{ //register an org
    let {org_name} = req.body;
    if(!org_name)
      return res.status(400).json({error:'need org name and user id'});
    dbService.createNew(req.app.get('db'),'orgs',{org_name}).then((newOrg)=>{
      return res.status(201).json(newOrg);
    }).catch(err);
  });


module.exports = Router;