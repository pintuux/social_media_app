import {body,validationResult} from "express-validator";
const ValidationOfUser = async (req,res,next)=>{
    // 1. validation rules 
    try{
        const rules = [
            body('name').notEmpty().withMessage('Name is required'),
            body('email').isEmail().withMessage('Email is required'),
            body('password').notEmpty().withMessage('Password is required')
            ]
            // 2. run the rules
            await Promise.all(rules.map(rule=>rule.run(req)));
            // 3. error validation
            const result  = validationResult(req);
            
            if(!result.isEmpty()){
              return  res.status(400).send(result.array()[0].msg);
            }
            // 4. call to next middleware
            next()
    }catch(err){
        console.log(err);
    }
}
export default ValidationOfUser;