const app = require('../src/app');
const knex = require('knex');
const testData = require('./fixtures');
const token ={Authorization:'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfbmFtZSI6ImR1bmRlci1taWZmbGluIiwib3JnIjoxLCJzdWIiOjEsImlhdCI6MTU2NTg5OTg1N30.vjiVagmR_Ulv77BM3eJ0GPH9pLB7KTvrrMSFKL45fQo'};
require('dotenv').config();
let db;
describe('all endpoints work as expected',()=>{
  before('connect to database',()=>{
    db = knex({
      client:'pg',
      connection:process.env.TEST_DB_URL
    });

    app.set('db',db);
  });

  after('disconnect from database',()=>db.destroy());
  
  describe('CRUD operations on comments',()=>{
    beforeEach('seed DataBase',async ()=>{
      await db('orgs').insert(testData.createOrg());
      await db('users').insert(testData.createUsers());
      await db('notices').insert(testData.createNotice());
      await db('comments').insert(testData.createComments());
    });
    afterEach('erase db',async ()=>{
      await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
      
    });
    context('success path',()=>{
      it('returns 200 and notices',()=>{ //get
        return request(app).get('/corkboards')
          .set(token)
          .expect(200);
      });
      it('returns 200 and comments',()=>{ //get
        return request(app).get('/1/comments')
          .set(token)
          .expect(200);
      });
      it('returns 201 on post',()=>{ //post
        return request(app).post('/1/comments')
          .set('Content-Type','application/json')
          .set(token)
          .send({content:'test comment',posted_on:1,created_by:1})
          .expect(201);
      });
    });
    context('Fail path',()=>{
      it('rejects incorrect request',()=>{
        return request(app).post('/1/comments')
        .set('Content-Type','application/json')
        .set(token)
        .send({content:'test comment',created_by:1})
        .expect(400);
      })
      it('rejects unauthorized request',()=>{
        return request(app).post('/1/comments')
        .set('Content-Type','application/json')
        .send({content:'test comment',posted_on:1,created_by:1})
        .expect(401);
      })
    });
  });

  context('Can login',()=>{
      beforeEach('seed DataBase',async ()=>{
        await db('orgs').insert(testData.createOrg());
        await db('users').insert(testData.createUsers());
        
      });
      afterEach('erase db',async ()=>{
        await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
        
      });
    it('returns Auth token when correct info given',()=>{
      
       return request(app)
        .post('/login')
        .send({'user_name':'test1',password:'password', org:'dunder-mifflin'})
        .expect(200)
        .expect((res)=>{
          console.log(res.body);
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('Auth');
        })
    }).timeout(8000);
    it('can register a new user',()=>{
      return request(app).post('/register/user')
        .set('content-type','application/json')
        .send({display_name:'David',password:'password',user_name:'awesome',org:1,user_position:1})
        .expect(201);
    });
    it('can register a new org',()=>{
      return request(app).post('/register/orgs')
        .set('content-type','application/json')
        .send({org_name:'David',admin:null})
        .expect(201);
    });
  });
  context('teams',()=>{
    it('can create a new team',()=>{
      return request(app).post('/teams')
          .set('Content-Type','application/json')
          .set(token)
          .send({team_name:'test-team'})
          .expect(201);

    });
  });
});
