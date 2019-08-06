module.exports = {
  getAllNotices(db,org){
    return db('notices').select('*').where({org});
  },
  getOrgById(db,id){
    return db('orgs').select('*').where({id}).first();
  },
  getByName(db,table,name){
    return db.raw(`SELECT * FROM ${table}s WHERE ${table}_name ='${name}' `);
  },
  createNew(db,table,obj){
    return db(table).insert(obj).returning('*');
  },
};