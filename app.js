var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reneesh');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.post('/sign_up', function(req,res){
   var name_r = req.body.name;
   var email_r =req.body.email;
   var pass_r = req.body.password;
   var phone_r =req.body.phone;
   var data_r = {
      "name": name_r,
      "email":email_r,
      "password":pass_r,
      "phone":phone_r
   }
   db.collection("details").find({email:email_r}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
    {     
        if(docs.length > 0) //if exists
        {
            console.log("Email already has a account")
            console.log(docs); // print out what it sends back
            return res.redirect('index.html');
        }
        else // if it does not 
        {
            console.log("New Account");
            db.collection('details').insertOne(data_r,function(err, collection){
                if (err) throw err;
                   console.log("Record inserted Successfully");
                   
                });
                db.collection('users').insertOne({"email":email_r,"password":pass_r},function(err, collection){
                 if (err) throw err;
                    console.log("login details inserted Successfully");
                 });
                 return res.redirect('login.html');
        }})  
})
app.post('/sign_in', function(req,res){
    var email_l =req.body.email;
    var pass_l = req.body.password;
 
    var data_l = {
       "email":email_l,
       "password":pass_l,
    }
    console.log(data_l)
    db.collection("users").find(data_l, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
    {     
        if(docs.length > 0) //if exists
        {
            console.log("Login Successfull")
            console.log(docs); // print out what it sends back
            return res.redirect('success.html');
        }
        else // if it does not 
        {
            console.log("Login credentials wrong or Account not found");
            return res.redirect('login.html');
        }})
 })
app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

console.log("server listening at port 3000");