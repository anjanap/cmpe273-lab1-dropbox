var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');

function fetchAct(callback,listQuery){
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

router.post('/activityrep',function(req,res){
	var uid=req.body.uid;
	console.log("UID activity: "+uid);
	var listQuery="select status from user_activity where userID="+uid+";";
	fetchAct(function(err,results){
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

module.exports=router;