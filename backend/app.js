const express = require('express');
const bodyParser= require('body-parser');

const app = express();

//this function will return a valid middleware for parsing json data
app.use(bodyParser.json());
//the argument extended:false is to make sure only default features are supported in the url enconding
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{

  //this means that it doesn't matter which domain the app that is sending the request is running on. It is allowed
  //to access the resources of the other domain (server)
  res.setHeader("Access-Control-Allow-Origin","*");

  //restrict to domains sending requests with a certain set of headers besides the default header. the other headers are
  // the other arguments. this means the incoming request can have these extra headers. It doesnt have to, but it can have it.
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");

  //Here we control which http words may be used to send requests
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS")
  next();
});
//all the requests reaching localhost/3000/posts will reach this middleware


app.use('/api/posts',(req,res,next)=>{
  const posts=req.body;
  console.log(post);
  //we need to return a response otherwise the request will timeout on the client
  // code 201 means everything's ok and a new resource was created
  res.status(201).json({
    message:'Posted added!'
  });
})
app.use('/api/posts',(req,res,next)=>{
  const  posts=[
    {
      id:'123',
      title:'First server-side post',
      content:'This is coming from the server'
    },

    {
      id:'256',
    title:'Second server-side post',
    content:'This is coming from the server'
  }
];
res.status(200).json({
  message: 'Posts were feched',
   posts :posts});
});


module.exports=app;
