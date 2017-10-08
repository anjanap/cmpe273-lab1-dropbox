var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');

function fetchData(callback,sqlQuery){
	var con=mysqlDB.getConnection();
	con.query(sqlQuery, function(err, rows, fields) {
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

router.post('/checklogin',function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	var sqlQuery="select * from user_details where email='"+username+"' and password='"+password+"';";
	fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				ssn=req.session;
				ssn.uid=results[0].userID;
				ssn.firstname=results[0].firstName;
				ssn.lastname=results[0].lastName;
				console.log("sess: "+ssn.lastname);
				console.log("Results: "+results);
				res.status(201).json({output:results});
			}
			else {
				console.log("Results: Wrong login");
				res.status(201).json({output:0});
			}
		}
	},sqlQuery);
	});

module.exports=router;