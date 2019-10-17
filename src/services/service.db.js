module.exports = {
  getAllNotices(db,org){
    return db('notices')
      .innerJoin('users','notices.created_by','users.id')
      .select('notices.id','title','content','user_name as created_by', 'created_on','level')
      .where({'notices.org':org});
  },
  getOrgById(db,id){
    return db('orgs').select('*').where({id}).first();
  },
  getOrgByCode(db,code){
    return db('orgs').select('*').where({code}).first();
  },
  getAllOrgNames(db){
    return db('orgs').select('org_name');
  },
  getByName(db,table,name){             /* this is to remove the 's' in the input */
    return db(table).select('*').where(table.slice(0,table.length-1).concat('_name'), name).first();
  },
  createNew(db,table,obj){
    return db(table).insert(obj).returning('*');
  },
  getCommentByNotice(db, noticeId){
    return db('comments')
      .innerJoin('users','comments.created_by','users.id')
      .select('content','display_name as created_by','created_on')
      .where({'comments.posted_on':noticeId});
  },
  createComment(db,comment){
    return db('comments').insert(comment).returning('*');
  },
  getNoticeById(db,id){
    return db('notices')
      .innerJoin('users', 'notices.created_by','users.id')
      .select('notices.id','title','content','level','display_name as created_by','created_on')
      .where({'notices.id':id}).first();
  },
  getAllTeamsByOrgId(db,id){
    return db('orgs').select('id','org_name as team_name').where({parent:id});
  },
  /**
   * 
   * @param {KnexInstance} db 
   * @param {string} table 
   * @param {object} update 
   * @param {number} id: INT
   */
  update(db,table,update,id){//update should be an object
    return db(table).update(update).where({id});
  },
};