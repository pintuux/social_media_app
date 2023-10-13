import express from 'express';
import LikeController from '../../controller/likes.controller/likes.controller.js';
import jwtAuth from '../../middleware/jwtauthentication.js';
const likeRouter = express.Router();
const likeController = new LikeController();
likeRouter.post('/like/:postId',jwtAuth,(req,res)=>{
    likeController.likeApost(req,res);
});
likeRouter.delete('/delete',jwtAuth,(req,res)=>{
    likeController.deleteLikes(req,res);
})
export default likeRouter;