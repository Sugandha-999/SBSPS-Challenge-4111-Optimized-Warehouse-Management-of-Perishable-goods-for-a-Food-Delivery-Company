 const bodyparser= require("body-parser");
 const express= require("express");
 const http= require("http");
 const app= express();
 var mongodb= require("mongodb");
 const mongoose = require("mongoose");
 var path= require("path");
 const port= 3000;

const {spawn} = require('child_process');
//var py= spawn('python',['compute final_solution.ipynb']);
//var dbcon=mongodb.MongoClient.connect("mongodb://localhost:27017/ibm");
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
});
 app.use(bodyparser.urlencoded({extended:true}));

 mongoose.connect("mongodb://localhost:27017/ibm",{useNewUrlParser: true});
//Connect to python Machine learning mode
app.post("/demand",function(req,res){
  var spawn = require('child_process').spawn;

var child = spawn('python', ['final_solution.py']);

child.stdout.on('data', function (data) {
    console.log("Data send to server");
    var parsedData = JSON.parse(data.toString());
    res.send(parsedData);
});
child.on('close', function (code) {
    if (code !== 0) {
        console.log('an error has occurred');
    }
});

return res.redirect("/");
});

//Connect to python Machine learning mode
 app.use(express.static(__dirname + "/public"));

 app.listen(3000, function(){
   console.log("server started on port 3000");
 });
 app.get("/",function(req,res){
   res.sendFile(__dirname + "/IBM.html");
 });

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
//var dataToSend;
// spawn new child process to call the python script
//const python = spawn('python', ['final_solution.py']);
// collect data from script
// in close event we are sure that stream from child process is closed
//python.on('close', (code){
//console.log(`child process close all stdio with code ${code}`);
// send data to browser
//python.stdout.on('data', function (data) {
  //console.log('Pipe data from python script ...');
  //dataToSend = data.toString();
 //});

//res.sendFile(__dirname + "/final_solution.py");
//res.send("Demand");
//console.log("Got the call");
//python.on('close', (code) => {
 //console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 //res.send(dataToSend)
 //});
