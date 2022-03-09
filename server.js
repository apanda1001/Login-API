
const express=require('express');
const bodyParser=require('body-parser');
const http = require('http');
// const mongoose = require("mongoose");
// const passport = require("passport");
// const passport_local = require("passport-local");
// const passportLocalMongoose =require("passport-local-mongoose");
const user = require('./data').userDB;
const bcrypt=require('bcrypt');
// mongoose.set('useNewUrlParser', true);
// // mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/Database");

var app = express();
const server = http.createServer(app);
app.use(express.static(__dirname));
// app.set("view engine",'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Handling user login
 
//Handling user logout
// app.get("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/prelogin");
// });
app.get('/prelogin', (req,res) => {
   res.sendFile(__dirname+'/prelogin.html');
}
)

app.get('/login', (req,res) => {
    res.sendFile(__dirname+'/login.html');
 }
 )

app.get('/PID', (req,res) => {
   res.sendFile(__dirname+'/PID.html');
}  
)  

app.post("/login",(req, res) => {
   try{
           let User = user.find((data)=>(req.body.username)===data.username);
           if(User)
           {
             let submittedPass = req.body.password; 
             let storedPass = User.password; 
            //  const passwordMatch = bcrypt.compare(submittedPass,storedPass);
             if (submittedPass===storedPass) {
                res.sendFile(__dirname+'/PID.html');
            } else {
                res.send("<div align ='center'><h2>Invalid password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
           }
           else{
            res.send("<div align ='center'><h2>Invalid username</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
           }
         }
       catch{
       res.send('Error caught');
   }
});

app.listen(3000, () => {
   console.log("Listening on http://localhost:3000/login");
});

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:<password1234>@user-database.mnrk4.mongodb.net/User-Database?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });





