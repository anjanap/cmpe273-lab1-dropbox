var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');
var passwordEncry=require('./passwordEncry');
var mkdirp = require('mkdirp');

router.post('/signup',function(req,res){
	var pool=mysqlDB.getConnectionP();
	var first=req.body.fname;
	var last=req.body.lname;
	var em=req.body.email;
	var pwd=req.body.password;
	
	//
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        else{
        console.log('connected as id ' + connection.threadId);
        var salt = passwordEncry.randomstring(8);
        var encrypwd = passwordEncry.sha512(pwd, salt);
        var insertQuery="insert into user_details(firstName,lastName,email,password) values('"+first+"','"+last+"','"+em+"','"+pwd+"');";
        connection.query(insertQuery,function(err,result){
			if(err){
				res.status(201).json({output:0});
			}
			else{
				res.status(201).json({output:1});
			}
		});

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
	}
  });
	//
	
	/*con.connect(function(err){
		if(err)
		throw err;
		
		var insertQuery="insert into user_details(firstName,lastName,email,password) values('"+first+"','"+last+"','"+em+"','"+pwd+"');";
		con.query(insertQuery,function(err,result){
			if(err){
				res.status(201).json({output:0});//throw err;
			}
			else{
				res.status(201).json({output:1});
			}
		});
		});*/
	});

module.exports=router;


/*mkdirp(('./file_uploads/'+first+last), function (err) {
if (err) console.error(err)
else console.log('dir created')
});*/