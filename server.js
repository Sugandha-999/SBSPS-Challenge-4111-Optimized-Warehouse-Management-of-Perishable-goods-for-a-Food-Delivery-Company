 const bodyparser= require("body-parser");
 const express= require("express");
 const http= require("http");
 const app= express();
 var mongodb= require("mongodb");
 const mongoose = require("mongoose");
 var path= require("path");
 const port= 3000;
//var dbcon=mongodb.MongoClient.connect("mongodb://localhost:27017/ibm");
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
});
 app.use(bodyparser.urlencoded({extended:true}));

 mongoose.connect("mongodb://localhost:27017/ibm",{useNewUrlParser: true});

 app.use(express.static(__dirname + "/public"));

 app.listen(3000, function(){
   console.log("server started on port 3000");
 });
 app.get("/",function(req,res){
   res.sendFile(__dirname + "/IBM.html");
 });

 //Connect to python Machine learning mode
 app.post("/demand",function(req,res){
const {PythonShell} = require('python-shell');

 PythonShell.run('final_solution.py', {args:[center_id , id , meal_id , week , base_price , checkout_price , emailer_for_promotion , homepage_featured] }, function (err, results) {
   if (err) throw err;
   console.log('finished');
   res.send(results);
   console.log("done");
});

 return res.redirect("/");
 });

 //Connect to python Machine learning mode

app.post("/feedback",function(req,res){
  var mail= req.body.email;
  var data= req.body.review;
  var review={
    "email": mail,
    "review": data
  }
  db.collection('feedback').insertOne(review,function(err,collection){
    if(err) throw err;
    console.log("Data saved successfully");
  });
  return res.redirect("/");
 });
 //app.post("/demand",function(req,res){
  // return res.redirect("/");
 //});

//new mongoose connection
//const mongoose = require("mongoose");
//connecting to URL of localhost
//mongoose.connect("mongodb://localhost:27017/ibm",{useNewUrlParser: true});
//read the data from dtabase
//mongoose.connection.close();



