const Router = require('express').Router();
const short = require('shortid');
const bcrypt = require('bcryptjs');
const dbService = require('../services/service.db');
const parser = require('express').json();
require('dotenv').config();
let welcomeNotice ={title:'Welcome to CorkBoard!',content:'##We are So excited to meet you!\n___\n![excited scream](https://media3.giphy.com/media/7eAvzJ0SBBzHy/source.gif)\n\u003ewelcome to corkboard, the _easiest_ way to communicate to your team!\n###How to use corkboard.\n1. make an Account (_wait i think you did that part already_) (o_o)\n2. create a team.\n    1. open settings\n    2. click create a team\n3. Post a message!\n    - use the [+](\'/newNotice\') button to create a Messages just like this one.\n    - Coarboard Messages supports HTML \u0026 [Markdown](https://www.markdowntutorial.com/)\n4. Comment on Messages\n\u003eafter a Message is created, you team members can comment on them!\n5. Have Fun!\n\n\n',level:1,org:null,created_by:null};
Router
  .post('/user',parser, (req,res,err)=>{//register a user
    let {user_name, password, org, display_name, user_position } = req.body;
    console.log( req.body);
    if(!user_name || !password || !org || !user_position)
      return res.status(400).json({error:'Must include user name, password, position and organization'});
    bcrypt.hash(password,10).then(password=>{
      dbService.createNew(req.app.get('db'),'users',{user_name,password,org,display_name, user_position})
        .then(async (newUser)=>{
          res.status(201).location(newUser.id).json(newUser);
        }).catch(err=>res.status(400).json({error:'User already Exist'}));
    });
   

  }).post('/orgs',parser, (req,res,err)=>{ //register an org
    let {org_name} = req.body;
    if(!org_name)
      return res.status(400).json({error:'Need Organization Name and User Id'});
    dbService.createNew(req.app.get('db'),'orgs',{org_name, code:short.generate()}).then(async (newOrg)=>{
      //debugger;
      if(newOrg[0].parent === null){//this is an org, not a team
        welcomeNotice.org= newOrg[0].id;
        await dbService.createNew(req.app.get('db'),'notices',welcomeNotice);//add welcome Notice
      }
      return res.status(201).json(newOrg);
    }).catch(err);
  });


module.exports = Router;