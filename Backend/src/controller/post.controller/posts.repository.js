import { ObjectId } from "mongodb";
import { getdb } from "../../config/mongodb.js";
export default class PostsRepository{
    constructor(){
        this.collection = "posts";
    }
    async updatePost(userId,id,imageUrl){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const item =await collection.updateOne({_id:new ObjectId(userId),posts:{$elemMatch:{postId:{$eq:id}}}},{$set:{"posts.$.imageurl":imageUrl}});
            console.log(item);
            return item
        }catch(err){
            console.log(err)
        }
    }
    async deletePost(userId,id){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const item =await collection.updateOne({_id:new ObjectId(userId)},{$pull:{posts:{postId:id}}});
            // console.log(item);
            return item
        }catch(err){
            console.log(err)
        }
    }
    async getById(id){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const posts = await collection.findOne({_id:new ObjectId(id)})
            return posts.posts;
        }catch(err){
            console.log(err)
        }
    }
    async getall(){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const allposts = await collection.find().toArray();
            return allposts;
        }catch(err){
            console.log(err)
        }
    }
    async addpostTodb(userId,post){
        const postDocument =  {
            _id: new ObjectId(userId),
            posts:[post]
        }
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const isuser = await collection.findOne({_id: new ObjectId(userId)});
            if(isuser){
                const posted = await collection.updateOne({_id: new ObjectId(userId)},{$push:{posts:post}});
                return posted.modifiedCount
            }else{
                const posted = await collection.insertOne(postDocument);
                return posted
            }
            
            // console.log("updated result",posted.acknowledged);
           
        }catch(err){
            console.log(err)
        }

    }
}

