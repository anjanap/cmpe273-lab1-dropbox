var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');

function fetchAct(callback,listQuery){
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