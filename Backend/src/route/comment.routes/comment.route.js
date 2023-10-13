import express from "express";
import CommentController from "../../controller/comment.controller/comment.controller.js";
import jwtAuth from "../../middleware/jwtauthentication.js";
const commentRouter = express.Router();
const commentController = new CommentController();
commentRouter.get('/getall/:postId',jwtAuth,(req,res)=>{
    commentController.getComment(req,res);
});
commentRouter.post('/postcomment/:postId',jwtAuth,(req,res)=>{
    commentController.postComment(req,res);
});
commentRouter.put('/update',jwtAuth,(req,res)=>{
    commentController.updateComment(req,res);
});
commentRouter.delete('/delete',jwtAuth,(req,res)=>{
    commentController.deleteComment(req,res);
})
export default commentRouter;