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
          res.status(404).json({error:'Organization Not Found'});
        else{
          res.status(200).json(org);//todo should only return name of org
        }
      });
    }

  })
  .get('/code',(req,res,next)=>{//look up org by code. this should return all info
    //endpoint/code?code=8digitcode
    let {code} = req.query;
    if(code.length !== 8)
      return res.status(400).json({err:'Invalid Organization Code'});
    dbService.getOrgByCode(req.app.get('db'),code).then(org=>{
      if(org === undefined)
        return res.status(404).json({err:'Organization Not Found'});
      return res.status(200).json(org);
    });

  })
  .get('/corkboards',auth ,(req,res,next)=>{
    let orgId = req.org.id;
    //todo check if valid number
    dbService.getAllNotices(req.app.get('db'),orgId).then((result)=>{
      if(result.length > 0)
        res.status(200).json({notices:result});
      else
        res.status(204).json({error:'No Notices Found For That Organization'});
    }).catch(next);
    
  });
module.exports = Router;