const app = require('express')();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');
require('dotenv').config();

// import middleware and routes

const {NODE_ENV} = require('./config');

const morganOptions = 'dev';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports:[
    new winston.transports.File({filename:'info.log',level:'info'})
  ]
});
app.set('logger',logger);
app.use(cors());
app.use(morgan(morganOptions));

app.use(helmet());
//routes
const orgRouter = require('./routes/org.router');
const commentRouter = require('./routes/comments.route');
const noticeRouter = require('./routes/notices.route');
const loginRouter = require('./routes/login.route');
const registerRoute = require('./routes/register.route');
const teamRoute = require('./routes/teams.route');
const userRoute = require('./routes/users.route');




//routes-->
app.use('/', orgRouter);//get org//protected
app.use('/', commentRouter);//protected
app.use('/', noticeRouter);//protected
app.use('/login',loginRouter);//protected
app.use('/register',registerRoute);
app.use('/teams',teamRoute);//protected
app.use('/',userRoute);
//end routes-->
app.get('/',(req,res)=>{
  res.status(200).send('Hello World');
});
app.use((err, req, res, next)=>{
  let response;
  console.log(err);
  logger.error(err.message + Date.now());
  if(NODE_ENV === 'production'){
    response = {error:'Critical Server Error'};
  }else{
    response = {error:err.message};
  }
  res.status(500).json(response);
});

module.exports = app;