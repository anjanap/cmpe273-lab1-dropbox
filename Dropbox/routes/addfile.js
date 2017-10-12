var express=require('express');
var multer=require('multer');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');

var id=3;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './file_uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
});

var upload = multer({storage:storage});

router.post('/add', upload.single('myfile'), function (req, res, next) {
	var con=mysqlDB.getConnection();
	var uid=req.body.uid;
	var fname=req.file.filename;
    var insertFile="insert into file_details(userID,fileName,starred,mainFolder) values('"+uid+"','"+fname+"',0,1);";
    var actUpdate="insert into user_activity(userID,status) values('"+uid+"','"+fname+" uploaded');";
	con.query(insertFile,function(err,result){
		if(err){
			res.status(201).json({upl:0});//throw err;
		}
		else{
			console.log(req.file);
			con.query(actUpdate);
			res.status(201).json({upl:1});
		}
	});  
    console.log(req.file);
});

/*
router.post('/add',function(req,res){
	if(req.files){
		console.log(req.files);
		res.json({upl:1});
	}
	else{
		console.log("File not uploaded");
		res.json({upl:0});
	}
	
});*/
/*
router.post('/add',multer({ dest: './file_uploads/'}).single('newfile'),function(req,res){
	//var con=mysqlDB.getConnection();
	console.log("file in server: "+req.file);
	//res.status(204).end();
	  if (!req.file) {
		    console.log("No file received");
		    res.json({upl:0});
		  } 
	  else {
		    console.log('file received');
		    res.json({upl:1});
		  }
	});
*/
module.exports=router;