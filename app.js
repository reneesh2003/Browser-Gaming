var express=require("express");
var bodyParser=require("body-parser");
var ejs=require("ejs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://reneesh:reneesh2003@ac-ugqzmai-shard-00-00.use5zvx.mongodb.net:27017,ac-ugqzmai-shard-00-01.use5zvx.mongodb.net:27017,ac-ugqzmai-shard-00-02.use5zvx.mongodb.net:27017/?ssl=true&replicaSet=atlas-90s9bj-shard-0&authSource=admin&retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));
const time= function(){
  d= new Date();
h=d.getHours();
m=d.getMinutes();
s=d.getSeconds();
y=d.getFullYear();
mo=d.getMonth();
da=d.getDate();
}
const detailsSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    account: String,
    phone: Number
  });
  const details= mongoose.model("user_details",detailsSchema);
app.post('/sign_up', function(req,res){
  time()
    const post= new details({
   name : req.body.name,
   email : req.body.email,
   password : req.body.password,
   phone :req.body.phone,
   account: da+"/"+(mo+1)+"/"+y
   });

   db.collection("user_details").find({email:post.email}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
    {     
        if(docs.length > 0) //if exists
        {
            console.log("Email already has a account")
            console.log(docs); // print out what it sends back
            return res.render('signup.ejs',{error: "Email already has a account"});
        }
        else // if it does not 
        {
            console.log("New Account");
            db.collection('user_details').insertOne(post,function(err, collection){
                if (err) throw err;
                   console.log("Record inserted Successfully");
                });
          db.collection('last_used').insertOne({email:post.email,RPS:"Not Yet Played",TTT:"Not Yet Played",Simon:"Not Yet Played"},function(err, collection){
            if (err) throw err;
              console.log("Record inserted Successfully");
              });
        }return res.render('index.ejs',{error: ""});
      })  
})

app.post('/home/rps', function(req,res){
      db.collection("last_used").find({email:global.email}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
    { 
      time()
      db.collection('last_used').updateOne({ email:global.email}, { $set: { "RPS": da+"/"+(mo+1)+"/"+y+"  "+h+":"+m+":"+s }});
    })
  return res.render('RPS.ejs');
});
app.post('/home/ttt', function(req,res){
      time()
      db.collection("last_used").find({email:global.email}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
    { 
      db.collection('last_used').updateOne({ email:global.email}, { $set: { "TTT": da+"/"+(mo+1)+"/"+y+"  "+h+":"+m+":"+s }});
    })
  return res.render('TTT.ejs');
});
app.post('/home/simon', function(req,res){
  time()
  db.collection("last_used").find({email:global.email}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
{ 
  db.collection('last_used').updateOne({ email:global.email}, { $set: { "Simon": da+"/"+(mo+1)+"/"+y+"  "+h+":"+m+":"+s }});
})
return res.render('Simon.ejs');
});
global.email=0
global.password=0
app.post('/home', function(req,res){
    var email_l =req.body.email;
    var pass_l = req.body.password;
    if (global.email===0){global.email=email_l
      global.password=pass_l}
    var data_l = {
       "email":email_l,
       "password":pass_l,
    }
   
    db.collection("user_details").find({email:global.email,password:global.password}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
    {     
        if(docs.length > 0) 
        {
            db.collection("last_used").find({email:global.email}, {$exists: true}).toArray(function(err, docs_in){
                return res.render('dashboard.ejs',{ Name: docs[0].name, email: docs[0].email, rps_lp:docs_in[0].RPS,ttt_lp:docs_in[0].TTT,Simon_lp:docs_in[0].Simon});})
        }
        else 
        {
            global.email=0
            global.password=0
            console.log("Login credentials wrong or Account not found");
            return res.render('index.ejs',{error: "Login credentials wrong or Account not found"});
        }})
 })
  
 const messageSchema= new mongoose.Schema({
    email: String,
    subject: String,
    message: String
    
  });
  const message= mongoose.model("user_comments",messageSchema);
  app.post('/Home_mes', function(req,res){
  const post= new message({
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });
  db.collection("user_details").find({email:global.email}, {$exists: true}).toArray(function(err, docs) 
    {       
            db.collection("last_used").find({email:global.email}, {$exists: true}).toArray(function(err, docs_in){ 
                post.save((err)=>{
                  if(!err)
                  res.render('dashboard.ejs',{ Name: docs[0].name, email: docs[0].email, rps_lp:docs_in[0].RPS,ttt_lp:docs_in[0].TTT,Simon_lp:docs_in[0].Simon});})
                })
                });
              
              })
app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.render('index.ejs',{error: ""});;
}).listen(3000)

app.get("/logout",(req,res)=>{
  global.email=0
  global.password=0
  return res.render('index.ejs',{error: ""});
});
app.post("/register",(req,res)=>{
  global.email=0
  global.password=0
  return res.render('signup.ejs',{error: ""});
});
console.log("server listening at port 3000");