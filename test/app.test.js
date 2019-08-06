const app = require('../src/app');
const knex = require('knex');
const testData = require('./fixtures');
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
      await db('users').insert(testData.createUsers());
      await db('orgs').insert(testData.createOrg());
      await db('notices').insert(testData.createNotice());
      await db('comments').insert(testData.createComments());
    });
    afterEach('erase db',async ()=>{
      await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
      
    });
    context('success path',()=>{
      it('returns 200 and notices',()=>{ //get
        return request(app).get('/1/comments')
          .expect(200);
      });
      it('returns 201 on post',()=>{ //post
        return request(app).post('/1/comments')
          .set('Content-Type','application/json')
          .send({org_name:'sega inc.',admin:1})
          .expect(201);
      });
      it('returns 201 on update',()=>{ //patch an comment
        return request(app).patch('/1/comments')// will change to "/:org/corkboard"
          .set('Content-Type','application/json')
          .send({userId:'admin',title:'test1',content:'Everyone is Fired'})
          .expect(201);
      });
      it('returns 204 on Delete',()=>{ //delete an comment
        return request(app).delete('/1/comments/1')// will change to "/:org/corkboard"
          .set('Content-Type','application/json')
          .expect(204);
      });
    });
    context('fail path',()=>{});
    describe('CRUD operations on notices',()=>{
      beforeEach('seed DataBase',async ()=>{
        await db('users').insert(testData.createUsers());
        await db('orgs').insert(testData.createOrg());
        await db('notices').insert(testData.createNotice());
        await db('comments').insert(testData.createComments());
      });
      afterEach('erase db',async ()=>{
        await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
        
      });
      context('success path',()=>{
        it('returns 200 and notices',()=>{ //get
          return request(app).get('/1/corkboard')
            .expect(200);
        });
        it('returns 201 on post',()=>{ //post
          return request(app).post('/organizations')
            .set('Content-Type','application/json')
            .send({org_name:'sega inc.',admin:1})
            .expect(201);
        });
        it('returns 201 on update',()=>{ //patch an Announcement
          return request(app).post('/1/corkboard')// will change to "/:org/corkboard"
            .set('Content-Type','application/json')
            .send({userId:'admin',title:'test1',content:'Everyone is Fired'})
            .expect(201);
        });
        it('returns 204 on Delete',()=>{ //delete an Announcement
          return request(app).post('/1/corkboard/1')// will change to "/:org/corkboard"
            .set('Content-Type','application/json')
            .expect(204);
        });
      });
      context('fail path',()=>{});
    });
  })
  });

