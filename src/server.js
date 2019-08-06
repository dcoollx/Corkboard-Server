const app = require('./app');
const {PORT} = require('./config');
require('dotenv').config();
const knex = require('knex');

const db = knex({
  client:'pg',
  connection:process.env.DATABASE_URL
});

app.set('db',db);


app.listen(PORT,()=>{
console.log(`Server is listening on port ${PORT}`);
});

