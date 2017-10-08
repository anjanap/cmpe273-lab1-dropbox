var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , signup = require('./routes/signup')
  , addfile = require('./routes/addfile')
  , listall = require('./routes/listall')
  , activity = require('./routes/activity')
  , http = require('http')
  , path = require('path');
var cors = require('cors');
var session = require('express-session');


/*
var logger = require('morgan');
var cookieParser = require('cookie-parser');*/
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
sess='';
// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/',index);
app.use('/login',login);
app.use('/signup',signup);
app.use('/addfile',addfile);
app.use('/listall',listall);
app.use('/starred',listall);
app.use('/starupdate',listall);
app.use('/activityrep',activity);
// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/calculate', calculate.calculate);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;



