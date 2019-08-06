module.exports = {
  getAllNotices(db,org){
    return db('notices').select('*').where({org});
  }
};