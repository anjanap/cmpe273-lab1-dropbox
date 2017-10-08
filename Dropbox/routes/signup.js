var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');
var mkdirp = require('mkdirp');

router.post('/signup',function(req,res){
	var con=mysqlDB.getConnection();
	var first=req.body.fname;
	var last=req.body.lname;
	var em=req.body.email;
	var pwd=req.body.password;
	con.connect(function(err){
		if(err)
		throw err;
		
		var insertQuery="insert into user_details(firstName,lastName,email,password) values('"+first+"','"+last+"','"+em+"','"+pwd+"');";
		con.query(insertQuery,function(err,result){
			if(err){
				res.status(201).json({output:0});//throw err;
			}
			else{
				/*mkdirp(('./file_uploads/'+first+last), function (err) {
				    if (err) console.error(err)
				    else console.log('dir created')
				});*/
				res.status(201).json({output:1});
			}
		});
		});
	});

module.exports=router;