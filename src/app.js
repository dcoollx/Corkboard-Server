const app = require('express')();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');
require('dotenv').config();

// import middleware and routes

const {NODE_ENV} = require('./config');

const morganOptions = 'common';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports:[
    new winston.transports.File({filename:'info.log',level:'info'})
  ]
});
app.use(cors());
app.use(helmet());
//routes
const orgRouter = require('./routes/org.router');
const commentRouter = require('./routes/comments.route');
const noticeRouter = require('./routes/notices.route');
const loginRouter = require('./routes/login.route');
const auth = require('./middleware/auth');



//routes-->
app.use('/', orgRouter);//get org//protected
app.use('/', commentRouter);//protected
app.use('/', noticeRouter);//protected
app.use('/login',loginRouter);//protected
//end routes-->

app.use((err, req, res, next)=>{
  let response;
  console.log(err);
  if(NODE_ENV === 'production'){
    response = {error:{message:'Critical Server Error'}};
  }else{
    response = {error:{message:err.message,err}};
  }
  res.status(500).json(response);
});
app.use(cors());
app.use(morgan(morganOptions));
app.get('/',(req,res)=>{
  res.status(200).send('Hello World');
});

module.exports = app;