import UserModel from "../../model/user.model/user.model.js";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export default class UserController{
   constructor(){
    this.userRepository = new UserRepository()
   }
    async usersingup(req,res){
        try{
            // console.log("hello name",req.body);
            const {name,email,password} = req.body;
            const userPassword =await bcrypt.hash(password,12);
            const userRepo = await  this.userRepository.getUser(email);
            if(!userRepo){
                const user = UserModel.signup(name,email,userPassword);
                console.log("user registration",user);
                await this.userRepository.addToDb(user);
                res.status(201).send('Registered successfully!');
                
            }else{
                res.status(200).send("Already registered");
            }
        }catch(err){
            console.log(err)
            res.status(404).send('Some thing went wrong');
        }
    }
    async usersingin(req,res){
        try{
            const {email,password} = req.body;
            const user =await  this.userRepository.getUser(email);
            // console.log("user verifiaction",user);
            
            
            
            if(user && await bcrypt.compare(password,user.userPassword)   ){
                const token = jwt.sign({userId:user._id,email},"FuAVU6QOuTaUKCt8MyZqvPuUkyNI3ab8",{expiresIn:60*60});
                if(token){
                    res.status(201).send(token)
                }else{
                res.status(400).send('some thing went wrong');
                }
            }else{
                return res.status(403).send('Invalid crendetial');
            }
            
        }catch(err){
            console.log(err);
        }
    }
}