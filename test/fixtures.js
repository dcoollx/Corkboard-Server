module.exports = {
  createUsers(){
    return [
      {
        username:'test1',
        password:'password',
        isadmin:true,
        org:1,
      },
      
      {
        username:'test2',
        password:'password',
        isadmin:false,
        org:1,
      },
      
      {
        username:'test3',
        password:'password',
        isadmin:true,
        org:2,
      }
    ];
  },
  createOrg(){
    return [{
      org_name:'dunder-mifflin',
      admin:1
    },{
      org_name:'mcdonalds',
      admin:3
    }];
  },
  createNotice(){
    return [
      {
        title:'test notice 1',
        content:'this is a test of the automatic test system',
        created_by:1,
        org:1
      },
    ];
  },
  createComments(){
    return [{
      content:'great comment',
      created_by:2,
      org:1 
    }];
  }
};