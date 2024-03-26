const { Promise } = require('mongoose');
const Post = require('../models/PostSchema');
const User = require('../models/UserSchema');

exports.createPost = async(req, res)=>{
    try{
           const postOwner=await User.findById(req.body['postOwner']);
           if(!postOwner){
            return res.status(401).json({message:"please login to create a new post"});

           }
           const newPost =await Post.create({
            PostOwner :req.body['PostOwner '],
            img:req.body['img'],
            caption:req.body['caption'],
            content:req.body['content'],
            
           }
           );
           return res
           .status(201)
           .json({data:newPost, message:"Post created succeflly"});



    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});

    }
}
exports.deletePost= async (req,res)=>{
    try{
          const userTryingToDelete= await User.findById(req.body['PostOwner']);
          if(!userTryingToDelete){
            return res.status(404).json({message:"user trying to delete the post not found"});}
           const post = await Post.findById(req.params['postID']);
           if(!post){
            return res.status(404).json({message:"post is not found"});

           }
           if (userTryingToDelete._id.tostring()!==post.PostOwner.tostring()){
            return res
            .status(400)
            .json({message:"user is not allowed to delete that is not owned by them"});
           }

          await deleteOne();
          return res.status(200).json({message:"post delete succefully"});


    }catch(err)
    {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}
exports.like = async(req,res)=>{
    try {
        const post=await Post.findById(req.params["postID"])
        if(!post){
            return res.status(401).json({message:"login to like the post"})
        }
        if(!post.likes.includes(req.body["userId"])){
            await post.updateOne({$push : {likes :req.body["userID"]}});
            return res.status(200).json("post has benn liked");

        }else{
            await post.updateOne({$pull : {likes : req.body["userID"]}});
            return res.status(200).json({message:"like has been disliked"});

        }

    } catch (err) {
        return res.status(500).json({message:err.message})
            
        
    }
}
exports.fetchTimelinePosts= async(req,res)=>{
    try {
        const currentUser = await User.findById(req.body['currentUserID']);
        if(!currentUser)
            return res.status(401).json({message:"Please login"});
            const currentUserPosts= await Post.find({
                postOwner: req.body["currentUserID"],
            });
            const friendsPosts= await Promise.all(
                currentUser.friends.map=>(friendID) {
                    return Post.find({postOwner: freindID});
                });
            
      const timelinePosts=currentUserPosts.concat(...friendsPosts);
          return timelinePosts.length<=0
          ?res.status(404).json({message:"there is no post to display"})
        :res.status(200).json(timelinePosts);    
  
    }catch (err) {
        return res.status(500).json({message:err.message})
          }
        }
                