import { ObjectId } from "mongodb";
import { getdb } from "../../config/mongodb.js";
export default class CommentRepository{
    constructor(){
        this.collection = 'comments';
    }
    // 1. get all comment from database.
    async getAllComment(postId){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const comt = await collection.find({postId}).toArray();
            // console.log(comment);
            return comt;
        }catch(err){
            console.log(err)
        }
    }
    // 2. addComment to the database.
    async addCommentToDb(userId,postId,commentwithId){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const isPerson = await collection.findOne({_id:new ObjectId(userId),postId:postId});
            if(isPerson){
                const posted = await collection.updateOne({_id:new ObjectId(userId),postId:postId},{$push:{comments:commentwithId}});
                return posted.modifiedCount
            }else{
                const posted = await collection.insertOne({_id:new ObjectId(userId),postId:postId,comments:[commentwithId]});
                return posted
            }
            
        }catch(err){
            console.log(err)
        }
    }
    // 3. update comment in db
    async updateCommentToDb(userId,postId,commentId,comment){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const updatedcomment = await collection.updateOne({_id: new ObjectId(userId),postId,comments:{$elemMatch:{commentId:{$eq:commentId}}}},{$set:{'comments.$.comment':comment}})
            // console.log(updatedcomment);
            return updatedcomment.modifiedCount;
        }catch(err){
            console.log(err)
        }
    }
    // 4. delete comment from databse
    async deleteCommentToDb(userId,postId,commentId){
        try{
            const db = await getdb();
            const collection = await db.collection(this.collection);
            const deleteditem = await collection.updateOne({_id:new ObjectId(userId),postId},{$pull:{comments:{commentId:{$eq:commentId}}}})
            // console.log(deleteditem);
            return deleteditem;
        }catch(err){
            console.log(err)
        }
    }
}