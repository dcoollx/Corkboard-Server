const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();

Router.post('/:orgId/notices',parser,(req, res, err)=>{
  let {orgId} = req.params;
  let {title,content,created_by,org=1} = req.body;
  if(!title || !content || !created_by)
    return res.status(400).json({error:'title content and created_by are required'});
  dbService.createNew(req.app.get('db'),'notices',{title,content,created_by,org})
    .then((result)=>{
      res.status(201).json(result);
    }).catch(err);
});

module.exports=Router;