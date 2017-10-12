var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqlDB');
var download=require('download');

/*e.get('/download/*',function(req,res){
	var f=req.params[0];
	console.log("filename: "+f)
	var path='./file_uploads/'+f;
	console.log("filename path: "+path)
	res.download(path);

	});*/
/*

router.post('/download',function(req,res){
	var f=req.body.fn;
	console.log("filename: "+f)
	var path='./file_uploads/'+f;
	console.log("filename path: "+path)
	return res.download(path);
	});

module.exports=router;*/