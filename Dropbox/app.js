var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , signup = require('./routes/signup')
  , addfile = require('./routes/addfile')
  , listall = require('./routes/listall')
  , activity = require('./routes/activity')
  , http = require('http')
  , path = require('path');
var crypto = require('crypto');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var download=require('download');

var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(cookieParser());
app.use(session({secret: "secretkey"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/',index);
app.use('/login',login);
app.use('/logout',login);
app.use('/signup',signup);
app.use('/addfile',addfile);
app.use('/folderfile',addfile);
app.use('/listall',listall);
app.use('/starred',listall);
app.use('/starupdate',listall);
app.use('/activityrep',activity);
app.use('/addfolder',listall);
app.use('/listfolder',listall);
app.use('/fileCont',listall);

app.get('/download/*',function(req,res){
	var f=req.params[0];
	console.log("filename: "+f)
	var path='./file_uploads/'+f;
	console.log("filename path: "+path)
	return res.download(path);
	});

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



