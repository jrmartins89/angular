const mongoose = require('mongoose');
const postschema = mongoose.Schema(
  {
    title:{type: String, required:true},
    content:{type: String, required:true}
  }
);

//this function transforms the shema into something mongoose can use
module.exports=mongoose.model('Post',postschema);
