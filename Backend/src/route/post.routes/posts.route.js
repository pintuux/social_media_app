import express from 'express';
import jwtAuth from '../../middleware/jwtauthentication.js';
const postRouter = express.Router();
import PostsController from '../../controller/post.controller/posts.controller.js';
const postController = new PostsController();
postRouter.post('/newpost',jwtAuth,(req,res)=>{
    postController.addPost(req,res);
});
postRouter.get('/allposts',jwtAuth,(req,res)=>{
    postController.getAllPost(res,res);
});
postRouter.get("/getpost/:id",jwtAuth,(req,res)=>{
    postController.getPostById(req,res);
});
postRouter.delete('/delete/:id',jwtAuth,(req,res)=>{
    postController.deletepost(req,res);
});
postRouter.put("/update/:id",jwtAuth,(req,res)=>{
    postController.updatepost(req,res);
})
export default postRouter;