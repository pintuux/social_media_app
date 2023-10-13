import CommentModel from "../../model/comment.model/comment.model.js";
import CommentRepository from "./comment.repository.js";

export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
    }
    // 1. get all comment. 
    async getComment(req,res){
        const {postId} = req.params
        try{
            const comment = await this.commentRepository.getAllComment(postId);
            if(comment.length > 0){
                res.status(200).send(comment[0].comments);
            }else{
                res.status(400).send('There is not any comments');
            }
        }catch(err){
            console.log(err)
        }
    }
    // 2. create a post.
    async postComment(req,res){
        const {postId} = req.params;
        const {comment} = req.body;
        const userId = req.userId;
        const commentwithId = CommentModel.createComment(comment);
        try{
            const postComment = await this.commentRepository.addCommentToDb(userId,postId,commentwithId); 
            if(postComment){
                res.status(201).send('Posted Successfully');
            }else{
                res.status(400).send("person does not found");
            }
        }catch(err){
            console.log(err)
        }
    }
    // 3. update the post.
    async updateComment(req,res){
        const userId = req.userId;
        const {comment} = req.body;
        const postId = req.query.postId;
        const commentId = req.query.commentId;
        // console.log(postId+"  "+commentId);
        try{
            const updatedcomment = await this.commentRepository.updateCommentToDb(userId,postId,commentId,comment);
            if(updatedcomment>0){
                res.status(200).send('Comment updated');
            }else{
                res.status(400).send("Invalid commentid");
            }
        }catch(err){
            console.log(err)
        }
    }
    // 4. delete the post.
    async deleteComment(req,res){
        const userId = req.userId;
        const postId = req.query.postId;
        const commentId = req.query.commentId;
        console.log(postId+" "+commentId);
        try{
            const deleteItem = await this.commentRepository.deleteCommentToDb(userId,postId,commentId);
            if(deleteItem.modifiedCount === 1){
                res.status(200).send('post Deleted successfully')
            }else{
                res.status(400).send('user/postId/commentId is invalid');
            }
        
        }catch(err){
            console.log(err)
        }
    }
}