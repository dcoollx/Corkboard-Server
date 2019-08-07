const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const auth = require('../middleware/auth');

Router.
  route('/:noticeId/comments')
  .get(auth,(req,res,next)=>{
    let {orgId, noticeId} = req.params;
    req.app.get('db')('comments').select('*').where({posted_on:noticeId})
      .then(query=>{
        if(!query)
          return res.status(404).json({error:'notice not found'});
        else
          return res.status(200).json(query);
      }).catch(next);
  }).post(auth,parser,(req,res,next)=>{
    let {content, created_by, posted_on} = req.body;
    if(!content||!created_by||!posted_on)
      return res.status(400).json({error:'must include content, created_by, and posted_on'});
    let comment = {content, created_by, posted_on};
    req.app.get('db')('comments').insert(comment).returning('*').then(results=>{
      res.status(201).location(results.id).json(results);
    }).catch(next);
  });

module.exports = Router;