const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const auth = require('../middleware/auth');

Router
  .get('/:orgId/corkboard',auth ,(req,res,next)=>{
    let {orgId} = req.params;
    //todo check if valid number
    dbService.getAllNotices(req.app.get('db'),orgId).then((result)=>{
      if(result.length > 0)
        res.status(200).json({notices:result});
      else
        res.status(404).json({error:'no notices found for that organization'});
    }).catch(next);
    
  }).post('/organizations',parser,(req,res,next)=>{
    let {org_name, admin} = req.body;
    //todo validate org name
    if(!org_name || !admin)
      return res.status(400).json({error:'invalid org'});
    dbService.getByName(req.app.get('db'),'org',org_name).then(query=>{ // a little problem with org param, need to remove s for it to work, will fix later
      if(!query.rows || query.rows.length <= 0)
        return dbService.createNew(req.app.get('db'),'orgs',{org_name,admin})
          .then(newObj=>res.status(201).json(newObj));//todo add location

    }).catch(next);
    


    //create a new org, will be protected

  });
module.exports = Router;