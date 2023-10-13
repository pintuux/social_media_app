import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017/SocialDb";
let client;
export const connectToMongodb = async ()=>{
    try{
        client = await MongoClient.connect(url);
       
        console.log("mongodb is connected");
        
        
    }catch(err){
        console.log(err);
    }
}
export const getdb= async ()=>{
    return  await client.db();
}
