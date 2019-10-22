const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const auth = require('../middleware/auth');

Router
  .patch('/users',auth,parser,(req,res,err)=>{
    let {update} = req.body;
    if(!update)
      return res.status(400);
    else
      dbService.update(req.app.get('db'),'users',update,req.user.id).then(()=>{
        return res.status(201).json({message:'User added to team'});
      })
        .catch(err);
  });
module.exports = Router;