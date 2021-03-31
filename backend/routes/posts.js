const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const multer = require('multer');
const post = require('../models/post');
const { count } = require('../models/post');

const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid){
      error=null;
    }
    cb(error, "backend/images");
  },
  filename:(req,file,cb)=>{
  const name = file.originalname.toLowerCase().split(' ').join('-');
  const ext = MIME_TYPE_MAP[file.mimetype];
  cb(null,name+'-'+Date.now()+'.'+ext);
  }
  });

router.post("",multer({storage:storage}).single("image"),(req,res,next)=>{
  const url= req.protocol+'://'+req.get("host");

  const post=new Post({
    title:req.body.title,
    content:req.body.content,
    //this is the image path I want to store in the Database
    imagePath:url+"/images/" + req.file.filename
  });
  post.save().then(createdPost=>{
    res.status(201).json({
      message:'Posted added!',
      post:{
        //using the spread operator to copy all properties of the created Post object and then add the id property to the new object created.
        ...createdPost,
        id: createdPost._id
      }
  });
  //we need to return a response otherwise the request will timeout on the client
  // code 201 means everything's ok and a  new resource was created
  });
});

router.put(
  "/:id",
  multer({storage:storage}).single("image"),
  (req,res,next)=>{
    let imagePath=req.body.imagePath;
    if(req.file){
      const url= req.protocol+'://'+req.get("host");
      imagePath=url+"/images/"+req.file.filename
    }

    const post = new Post({
    _id:req.body.id,
    title: req.body.title,
    content:req.body.content,
    imagePath:imagePath
  });
  console.log(post);
  Post.updateOne({_id:req.params.id}, post).then(result=>{
    console.log(result);
    res.status(200).json({message:"Update sucessful!"});
  });
});


    //query paraments are pieces of information that you add at the end of the url, separated from the domain and path by a question mark
router.get("",(req,res,next)=>{
  //add the + in the beginning to convert the statement to numbers
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery=Post.find();
  let fetchedPosts;
  if(pageSize && currentPage){
    //this skip method will skip all the elements of the pageSize. We will not retreive all the elements we find.
    postQuery
    // if we are on page 3 we need to skipe the first 20 itens. so we have pagesize=10 currentpage=3
    //10*(3-1)=20 items to skip
    .skip(pageSize*(currentPage-1))
    .limit(pageSize);
  }
  postQuery.then(documents=>{
    console.log(documents);
    fetchedPosts=documents;
    return Post.count();
    })
    .then(count=>{
      res.status(200).json({
          message: 'Posts were feched successufully!',
           posts :fetchedPosts,
           maxPosts:count

      })
    })
  });


router.get("/:id",(req,res,next)=>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message:'Post not found!'});
    }
  });
});

//:id will be used to dinamically pass the post id via the api request to delete it
router.delete("/:id", (req,res,next)=> {
  console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:"Post deleted!"});
  });
});

module.exports=router;
