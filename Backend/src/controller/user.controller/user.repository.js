import { getdb } from "../../config/mongodb.js";

export default class UserRepository{
    constructor(){
        this.collection = 'user';
    }
    async getUser(email){
        try{
            const db =await getdb();
            const collection =await db.collection(this.collection);
            const user =  await collection.findOne({email});
            // console.log('user in database',user);
            return user;
           
        }catch(err){
            console.log(err)
        }
        
    }
    async addToDb(userData){
        try{
           
        const db =await getdb();
        const collection =await db.collection(this.collection);
        const user = await collection.insertOne(userData);
        return user; 
        }catch(err){
            console.log(err)
        }
        
        // await db.collection(this.collection).insertOne(userData,)
    }
}