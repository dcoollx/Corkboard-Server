module.exports = {
  createUsers(){
    return [
      {
        user_name:'test1',
        display_name:'Test',
        password:'$2a$16$wLb7fCyq6gtRzDJyswOxbOuVOSh/lguktVJwThn4DSRBD8Ms9bBMm',
        isadmin:true,
        user_position:1,
        org:1,
      },
      
      {
        user_name:'test2',
        display_name:'Test',
        reports_to:1,
        password:'$2a$16$wLb7fCyq6gtRzDJyswOxbOuVOSh/lguktVJwThn4DSRBD8Ms9bBMm',
        isadmin:false,
        user_position:1,
        org:1,
      },
      
      {
        user_name:'test3',
        display_name:'User',
        reports_to:1,
        user_position:1,
        password:'$2a$16$wLb7fCyq6gtRzDJyswOxbOuVOSh/lguktVJwThn4DSRBD8Ms9bBMm',
        isadmin:true,
        org:2,
      }
    ];
  },
  createOrg(){
    return [{
      org_name:'dunder-mifflin',
      admin:null
    },{
      org_name:'mcdonalds',
      admin:null
    }];
  },
  createNotice(){
    return [
      {
        title:'test notice 1',
        content:'this is a test of the automatic test system',
        created_by:1,
        org:1,
        level:1
      },
    ];
  },
  createComments(){
    return [{
      content:'great comment',
      created_by:2,
      posted_on:1,
      org:1 
    }];
  }
};