import { info } from 'console';
import fs from 'fs';
const fsPromise = fs.promises;
import winston from 'winston';
// async function log(logData){
//     try{
//         logData = `\n new Date().toString() + '. log data' + ${logData}`;
//         await fsPromise.appendFile('log.txt',logData);
//     }catch(err){
//         console.log(err);
//     }
// }
const logger = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta:{servises :'request -logger'},
    transports:[
        new winston.transports.File({filename:"log.txt"})
    ]
})
const loggerMiddleware = async (req,res,next) =>{
    if(!req.url.includes('signin')){
        const logData = `${req.url}- ${JSON.stringify(req.body)} `
        logger.info(logData);
    }
    
    next();
};
export default loggerMiddleware;