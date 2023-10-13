import express from 'express';
import UserController from '../../controller/user.controller/user.signup.controller.js';
// import jwtAuth from '../../middleware/jwtauthentication.js';
import ValidationOfUser from '../../middleware/validator.middleware.js';
const userRouter = express.Router();
const userController = new UserController();
userRouter.post('/signup',ValidationOfUser,(req,res)=>{
    userController.usersingup(req,res)
})
userRouter.post('/signin',(req,res)=>{
    userController.usersingin(req,res);
})
export default userRouter;