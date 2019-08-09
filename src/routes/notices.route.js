const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const auth = require('../middleware/auth');

Router.post('/notices',auth,parser,(req, res, err)=>{
  let org = req.org.id;
  let created_by = req.user.id;
  let {title,content,level} = req.body;
  if(!title || !content || !created_by || !level)
    return res.status(400).json({error:'title, level, content and created_by are required'});
  dbService.createNew(req.app.get('db'),'notices',{title,content,created_by,org,level})
    .then((result)=>{
      res.status(201).json(result);
    }).catch(err);
});

module.exports=Router;