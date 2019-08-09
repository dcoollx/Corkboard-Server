module.exports = {
  getAllNotices(db,org){
    return db('notices')
      .innerJoin('users','notices.created_by','users.id')
      .select('notices.id','title','content','user_name as created_by', 'created_on')
      .where({'notices.org':org});
  },
  getOrgById(db,id){
    return db('orgs').select('*').where({id}).first();
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
      .select('content','user_name as created_by','created_on')
      .where({'comments.posted_on':noticeId});
  },
  createComment(db,comment){
    db('comments').insert(comment).returning('*');
  },
};