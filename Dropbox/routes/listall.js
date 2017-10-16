var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');


function fetchFiles(callback,listQuery){
	/*var con=mysqlDB.getConnection();
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
	con.end();*/
	var pool=mysqlDB.getConnectionP();
	
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        else{
        console.log('connected as id ' + connection.threadId);

        connection.query(listQuery,function(err,rows){
            connection.release();
            if(!err) {
    			console.log("DB Results:"+rows);
    			callback(err, rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
	}
  });
	
	
	
}

router.post('/list',function(req,res){
	var uid=req.body.uid;
	console.log("UID list: "+uid);
	console.log("Session userId: "+req.session.userid);
	var listQuery="select * from file_details where userID='"+uid+"';";
	fetchFiles(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				//console.log("Query Results: "+results);
				res.status(201).json({data:results});
			}
			else {
				console.log("Results: No data");
				res.status(201).json({data:0});
			}
		}
	},listQuery);
	});




router.post('/fileCont',function(req,res){
	var fid=req.body.fid;
	console.log("FILE ID: "+fid);
	var listQuery="select * from folder_details where folderID='"+fid+"';";
	fetchFiles(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				//console.log("Query Results: "+results);
				res.status(201).json({data:results});
			}
			else {
				console.log("Results: No data");
				res.status(201).json({data:0});
			}
		}
	},listQuery);
	});



router.post('/listfolder',function(req,res){
	var uid=req.body.uid;
	console.log("UID list: "+uid);
	var listQuery="select * from folder_details where userID="+uid+";";
	fetchFiles(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				//console.log("Query Results: "+results);
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
	var listQuery="select fileName from file_details where userID="+uid+" and starred=1;";
	fetchFiles(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				//console.log("Query Results: "+results);
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
	var pool=mysqlDB.getConnectionP();//var con=mysqlDB.getConnection();
	var fid=req.body.fid;
	var st=req.body.st;
	var upd;
	if(st==0)
		upd="update file_details set starred=1 where fileID="+fid+";";
	else
		upd="update file_details set starred=0 where fileID="+fid+";";		
	
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        else{
        console.log('connected as id ' + connection.threadId);
        connection.query(upd,function(err,result){
			if(err){
				res.status(201).json({output:0});//throw err;
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
	
	
	/*con.query(upd,function(err,result){
		if(err){
			res.status(201).json({upd:0});//throw err;
		}
		else{
			res.status(201).json({upd:1});
		}
	});*/  
});


router.post('/addfolder',function(req,res){
	//var con=mysqlDB.getConnection();
	var pool=mysqlDB.getConnectionP();
	var uid=req.body.uid;
	var newf=req.body.newf;
	console.log("Folder: "+newf);
	console.log("Folder uid: "+uid);
	var actUpdate="insert into user_activity(userID,status) values('"+uid+"','"+newf+" : Folder created');";
	var insertQuery="insert into folder_details(folderName,userID) values('"+newf+"',"+uid+");";
	
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        else{
        console.log('connected as id ' + connection.threadId);
        connection.query(insertQuery,function(err,result){
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
	
	
	/*con.connect(function(err){
		if(err)
		throw err;
		var actUpdate="insert into user_activity(userID,status) values('"+uid+"','"+newf+" : Folder created');";
		var insertQuery="insert into folder_details(folderName,userID) values('"+newf+"',"+uid+");";
		con.query(insertQuery,function(err,result){
			if(err){
				res.status(201).json({output:0});
			}
			else{
				con.query(actUpdate);
				res.status(201).json({output:1});
			}
		});
		});*/
	});



module.exports=router;