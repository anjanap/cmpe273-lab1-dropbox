var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');


function fetchFiles(callback,listQuery){
	var con=mysqlDB.getConnection();
	console.log("QUERY: "+listQuery);
	con.query(listQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	con.end();
}

router.post('/list',function(req,res){
	var uid=req.body.uid;
	console.log("UID list: "+uid);
	var listQuery="select * from file_details where userID='"+uid+"';";
	fetchFiles(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("Query Results: "+results);
				res.status(201).json({data:results});
			}
			else {
				console.log("Results: No data");
				res.status(201).json({data:0});
			}
		}
	},listQuery);
	});

router.post('/starred',function(req,res){
	var uid=req.body.uid;
	console.log("***: "+uid);
	var listQuery="select fileName from file_details where userID="+uid+" and starred=1;";
	fetchFiles(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("Query Results: "+results);
				res.status(201).json({data:results});
			}
			else {
				console.log("Results: No data");
				res.status(201).json({data:0});
			}
		}
	},listQuery);
	});

router.post('/starupdate', function (req, res, next) {
	var con=mysqlDB.getConnection();
	var fid=req.body.fid;
	var st=req.body.st;
	var upd;
	if(st==0)
		upd="update file_details set starred=1 where fileID="+fid+";";
	else
		upd="update file_details set starred=0 where fileID="+fid+";";
	con.query(upd,function(err,result){
		if(err){
			res.status(201).json({upd:0});//throw err;
		}
		else{
			res.status(201).json({upd:1});
		}
	});  
});

module.exports=router;