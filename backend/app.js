const express = require('express');

//this express app is a big chain of middlewares we apply to the incoming requets. It's like a funnel through which we
//sent requests and every part of the funnel can do things to the requests.
const app = express();

// the use keyword uses a new middleware
// if you dont send a response you have to call next()


app.use((req,res,next)=>{
  console.log('first middleware');
  next();
});

app.use((req,res,next)=>{
  res.send('Hello from express!');
})

module.exports=app;


