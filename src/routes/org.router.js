const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const auth = require('../middleware/auth');

Router
  .get('/orgs',(req,res,err)=>{//get name of all orgs or one if specified
    let {name} = req.query;
    if(!name)
      dbService.getAllOrgNames(req.app.get('db')).then(orgs=>res.status(200).json(orgs));
    else{
      dbService.getByName(req.app.get('db'),'orgs',name).then(org=>{
        console.log(org);
        if(!org)
          res.status(404).json({error:'org not found'});
        else{
          res.status(200).json(org);
        }
      });
    }

  })
  .get('/corkboards',auth ,(req,res,next)=>{
    let orgId = req.org.id;
    //todo check if valid number
    dbService.getAllNotices(req.app.get('db'),orgId).then((result)=>{
      if(result.length > 0)
        res.status(200).json({notices:result});
      else
        res.status(404).json({error:'no notices found for that organization'});
    }).catch(next);
    
  }).post('/organizations',auth,parser,(req,res,next)=>{
    let {org_name} = req.body;
    //todo validate org name
    if(!org_name )
      return res.status(400).json({error:'invalid org'});
    dbService.getByName(req.app.get('db'),'orgs',org_name).then(org=>{ // a little problem with org param, need to remove s for it to work, will fix later
      if(!org)
        return dbService.createNew(req.app.get('db'),'orgs',{org_name,admin:req.user.id})
          .then(newObj=>res.status(201).json(newObj));//todo add location
      else{
        return res.status(400).json({error:'Org Already exists'});
      }

    }).catch(next);
    


    //create a new org, will be protected

  });
module.exports = Router;