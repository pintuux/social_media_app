import { ObjectId } from "mongodb";
import { getdb } from "../../config/mongodb.js";
export default class LikeRepository{
    constructor(){
        this.collection = 'likes';
    }
    async addLike(userId,postId){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const islike = await collection.findOne({postId});
            if(islike){
                const like = await collection.updateOne({postId},{$addToSet:{likes:userId}})
                console.log(like);
                return like.modifiedCount;
            }else{
                const like  = await collection.insertOne({postId,likes:[userId]})
                return like.acknowledged;
            }
            
        }catch(err){
            console.log(err)
        }
    }
    async deletelike(postId,liked){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const like = await collection.updateOne({postId},{$pull:{likes:liked}});
            return like.modifiedCount;
        }catch(err){
            console.log(err);
        }
    }
}