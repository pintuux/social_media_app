import bcrypt from 'bcrypt';

export default class UserModel{
    constructor(name,email,userPassword){
        
        this.name = name;
        this.email = email;
        this.userPassword = userPassword;
        
    }
    static  isUser(name,email,userPassword){
        const userData = new UserModel(name,email,userPassword);
       
        return user;
    }
    static signup(name,email,userPassword){
        return new UserModel(name,email,userPassword);
    }
}