import LikeRepository from "./likes.repository.js";

export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }
    //1. like a post
    async likeApost(req,res){
        const userId = req.userId;
        const {postId} = req.params;
        try{
            const like = await this.likeRepository.addLike(userId,postId);
            console.log(like);
            if(like && like === 1){
              return  res.status(200).send("liked post");
            }
            else if(like===0){
               return res.status(200).send("you already liked")
            }else if(like){
               return res.status(200).send('liked post');
            }else{
                res.status(400).send('PostId not found');
            }
        }catch(err){
            console.log(err);
        }
    }
    //2. delete a like i.e toggle like
    async deleteLikes(req,res){
        const postId = req.query.postId;
        const liked = req.query.liked;
        try{
            const deletelike = await this.likeRepository.deletelike(postId,liked);
            if(deletelike){
                res.status(200).send("like deleted");
            }else{
                res.status(400).send('postId/liked not found');
            }
        }catch(err){
            console.log(err);
        }
    }
}