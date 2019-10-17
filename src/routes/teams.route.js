const Router = require('express').Router();
const dbService = require('../services/service.db');
const parser = require('express').json();
const auth = require('../middleware/auth');

Router
  .route('/')
  .get(auth,(req,res,err)=>{ //get all teams belonginging to a certain org
    dbService.getAllTeamsByOrgId(req.app.get('db'),req.org.id)
      .then(teams=>{
        return res.status(200).json(teams);
      }).catch(err);

  })
  .post(auth,parser,(req,res,err)=>{
    let {team_name} = req.body;
    console.log('user',req.org);
    if(!team_name)
      return res.status(400).json({error:'need team_name to create a new team'});
    dbService.createNew(req.app.get('db'),'orgs',{org_name:team_name,admin:req.user.id,parent:req.org.id})
      .then(result=>{
        //first join user to that team
        console.log({team:result[0].id});
        dbService.update(req.app.get('db'),'users',{team:result[0].id},req.user.id)
          .then(()=>{
            return res.status(200).json(result);
          });
      }).catch(err);

  });
module.exports = Router;