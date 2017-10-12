var ejs=require('ejs');
var mysql=require('mysql');

function getConnection(){
	var con=mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"12345",
		database:"dropbox"
			});
	return con;
}


function getConnectionP(){
	var pool=mysql.createPool({
		connectionLimit : 50, //important
		host     : 'localhost',
		user     : 'root',
		password:'12345',
		database:'dropbox',
		debug    :  false
		});	
return pool;
}

exports.getConnection=getConnection;
exports.getConnectionP=getConnectionP;