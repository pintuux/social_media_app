import jwt from "jsonwebtoken"
const jwtAuth =  (req,res,next)=>{
    
        const token =req.header('Authorization');
        // console.log("tokent",token);
        if(!token){
            return res.status(400).send("Unauthorized");
        }
        
        try{
            const decoded = jwt.verify(token,"FuAVU6QOuTaUKCt8MyZqvPuUkyNI3ab8")
            // console.log(decoded);
            req.userId = decoded.userId;
            next();
    
        }catch(err){
            console.log(err)
           return res.status(401).send("Unauthorized");
        }
}
export default jwtAuth