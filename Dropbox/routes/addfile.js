var express=require('express');
var multer=require('multer');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');

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
	var pool=mysqlDB.getConnectionP();
	var uid=req.body.uid;
	var fname=req.file.filename;
    var insertFile="insert into file_details(userID,fileName,starred,mainFolder) values('"+uid+"','"+fname+"',0,1);";
    var actUpdate="insert into user_activity(userID,status) values('"+uid+"','"+fname+" : File uploaded');";
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        else{
        console.log('connected as id ' + connection.threadId);
        connection.query(insertFile,function(err,result){
			if(err){
				res.status(201).json({output:0});//throw err;
			}
			else{
				connection.query(actUpdate);
				res.status(201).json({output:1});
			}
		});
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
	}
  });
    console.log(req.file);
});


router.post('/folderfile', upload.single('myfile'), function (req, res, next) {
	var pool=mysqlDB.getConnectionP();
	var uid=req.body.uid;
	var foldID=req.body.foldID;
	var fname=req.file.filename;
	var insertFile="insert into file_details(userID,fileName,starred,folderID) values('"+uid+"','"+fname+"',0,"+foldID+");";
	var actUpdate="insert into user_activity(userID,status) values('"+uid+"','"+fname+" : File uploaded');";
	console.log("Fname:--- ",foldID);
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        else{
        console.log('connected as id ' + connection.threadId);
        connection.query(insertFile,function(err,result){
			if(err){
				res.status(201).json({output:0});//throw err;
			}
			else{
				connection.query(actUpdate);
				res.status(201).json({output:1});
			}
		});

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
	}
  });  
    console.log(req.file);
});



module.exports=router;