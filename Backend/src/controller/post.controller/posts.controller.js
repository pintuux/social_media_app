import PostsRepository from "./posts.repository.js";
import PostModel from "../../model/post.model/post.model.js";
export default class PostsController{
    constructor(){
        this.postsRepository = new PostsRepository();
    }
    async updatepost(req,res){
        const {id} = req.params;
        const userId = req.userId;
        const {imageUrl} = req.body;
        try{
            const item = await this.postsRepository.updatePost(userId,id,imageUrl);
            if(item.modifiedCount===1){
                res.status(200).send('post update successfully');
            }else{
                res.status(400).send('postid not found');
            }
        }catch(err){

        }
    }
    async deletepost(req,res){
        const {id} = req.params;
        // console.log("post id",id);
        const userId = req.userId;
        // console.log(userId);
        try{
            const item = await this.postsRepository.deletePost(userId,id)
            if(item.modifiedCount === 1 ){
                res.status(200).send("post delete successfully");
            }else{
                res.status(400).send('postId not found')
            }
        }catch(err){
            console.log(err)
        }
    }
    async getPostById(req,res){
        const {id} = req.params;
        try{
            const postbyid = await this.postsRepository.getById(id);
            if(postbyid){
                res.status(200).send(postbyid);
            }else{
                res.status(400).send('Id is invalid')
            }
        }catch(err){
            console.log(err)
        }
    }
    async getAllPost(req,res){
        try{
            const allposts = await this.postsRepository.getall();
            if(allposts.length >0){
                const allpost = []
                for(let i=0 ; i < allposts.length; i++){
                    for(let j = 0 ; j< allposts[i].posts.length; j++){
                        allpost.push(allposts[i].posts[j]);
                    }
                }
                res.status(200).send(allpost);
            }else{
                res.status(200).send("There is no post");
            }
            
        }catch(err){
            console.log(err)
        }
    }
    async addPost(req,res){
        try{
            const {imageUrl} = req.body;
            const userId = req.userId;
            // console.log("user id which posted",userId)
            const post = PostModel.createPost(imageUrl)
            const posts = await this.postsRepository.addpostTodb(userId,post);
            if(posts){
                res.status(201).send('posted successfully');
            }
            else{
                res.status(400).send("user not found");
            }
        }catch(err){
            console.log(err)
        }

    }
    async getPost(req,res){

    }
}