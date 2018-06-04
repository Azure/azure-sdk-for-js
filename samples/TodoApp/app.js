const CosmosClient = require('../../').DocumentClient;
const config = require('./config');
const TaskList = require('./routes/tasklist');
const TaskDao = require('./models/taskDao');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Todo App:
const docDbClient = new CosmosClient(config.host, {
    masterKey: config.authKey
});
const taskDao = new TaskDao(docDbClient, config.databaseId, config.collectionId);
const taskList = new TaskList(taskDao);
taskDao.init((err) => {
  console.error(err);
});

app.get('/', (req, res, next) => taskList.showTasks(req, res).catch(next));
app.post('/addtask', (req, res, next) => taskList.addTask(req, res).catch(next));
app.post('/completetask', (req, res, next) => taskList.completeTask(req, res).catch(next));
app.set('view engine', 'jade');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
