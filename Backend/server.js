// create a express server 
import express from "express";
import { connectToMongodb } from "./src/config/mongodb.js";
import userRouter from "./src/route/user.routes/user.route.js";
import postRouter from "./src/route/post.routes/posts.route.js";
import commentRouter from "./src/route/comment.routes/comment.route.js";
import likeRouter from "./src/route/like.routers/likes.routes.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware)
app.use('/api/user',userRouter);
app.use('/api/post',postRouter);
app.use('/api/comments',commentRouter);
app.use('/api/likes',likeRouter);
//Error handler
app.use((err,req,res,next)=>{ 
    console.log(err);
    res.status(503).send("some thing went wrong please try  later"  )
})
app.get('/',(req,res)=>{
    res.send("Welcome to social media application");
    
});
app.listen(3200,()=>{
    console.log("server is running on port:",3200);
    connectToMongodb();
})
