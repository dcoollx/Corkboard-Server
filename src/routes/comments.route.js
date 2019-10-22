const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const auth = require('../middleware/auth');

Router.
  route('/:noticeId/comments')
  .get(auth,(req,res,next)=>{
    let {noticeId} = req.params;
    dbService.getCommentByNotice(req.app.get('db'), noticeId)
      .then(query=>{
        if(!query)
          return res.status(404).json({error:'Notice Not Found'});
        else
          return res.status(200).json(query);
      }).catch(next);
  }).post(auth,parser,(req,res,next)=>{
    let {content, posted_on} = req.body;
    if(!content||!posted_on)
      return res.status(400).json({error:'Must Include Content, Created by, and Posted on'});
    let comment = {content, created_by:req.user.id, posted_on};
    dbService.createComment(req.app.get('db'),comment).then(results=>{
      results[0].created_by = req.user.display_name;
      console.log(results);
      res.status(201).location(results.id).json(results);
    }).catch(next);
  });

module.exports = Router;