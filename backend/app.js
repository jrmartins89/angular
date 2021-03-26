const express = require('express');

const app = express();

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
