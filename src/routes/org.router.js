const Router = require('express').Router();
const dbService = require('../services/service.db');

Router.route('/:orgId/corkboard')
  .get((req,res,next)=>{
    let {orgId} = req.params;
    //todo check if valid number
    dbService.getAllNotices(req.app.get('db'),orgId).then((result)=>{
      if(result.length > 0)
        res.status(200).json({notices:result});
      else
        res.status(404).json({error:'no notices found for that organization'});
    }).catch(next);
    
  });
module.exports = Router;