var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , signup = require('./routes/signup')
  , addfile = require('./routes/addfile')
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
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;



