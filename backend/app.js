const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require ("./routes/posts");

const app = express();


mongoose.connect("mongodb+srv://jrmartins89:Thepillows1@cluster0.v0krp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(()=>{
  console.log("Connected to database!");
}).catch(()=>{
  console.log("Connection failed!");
});
//this function will return a valid middleware for parsing json data
app.use(bodyParser.json());

//the argument extended:false is to make sure only default features are supported in the url enconding
app.use(bodyParser.urlencoded({extended:false}));

//any requests targeting /images will be allowed to continue and fetch the images from the folder. the path function
//at the end makes sure the requests that target /images will be forwarded to 'backend/images'.
app.use("/images",express.static(path.join("backend/images")));

app.use((req,res,next)=>{

  //this means that it doesn't matter which domain the app that is sending the request is running on. It is allowed
  //to access the resources of the other domain (server)
  res.setHeader("Access-Control-Allow-Origin","*");

  //restrict to domains sending requests with a certain set of headers besides the default header. the other headers are
  // the other arguments. this means the incoming request can have these extra headers. It doesnt have to, but it can have it.
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  //Here we control which http words may be used to send requests
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");

  next();
});
//all the requests reaching localhost/3000/posts will reach this middleware

app.use("/api/posts", postRoutes);

module.exports=app;
