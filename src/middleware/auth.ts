import jwt from 'jsonwebtoken';
import express from 'express';


const auth_Login  =  async (req: express.Request, res: express.Response,next: express.NextFunction) => {
    try{
        const token = req.cookies.jwt;
        //console.log(token);
        if(token==undefined){
            next()
        }
        else{
            const verifyUser = jwt.verify(token,'Pankaj Parmar');
            console.log(verifyUser);
            next();
        }   
    }catch(err){
        console.log(err);   
        res.status(404).json({message: err});
    }
}

const auth  =  async (req: express.Request, res: express.Response,next: express.NextFunction) => {
    try{
        const token = req.cookies.jwt;
        // console.log(token);
        const verifyUser = jwt.verify(token,'Pankaj Parmar');
        // console.log(verifyUser);
        next();       
    }catch(err){
        console.log(err);
        res.status(404).json({message: err});
    }
}

//with the help of Bearer

// const auth = (req:express.Request, res: express.Response,next:express.NextFunction) => {
//     let token = req.headers['authorization'];
//     if(token==undefined){
//          res.status(401).json({error:"token is not present"})
//         //next();
//     }
//     if(token?.startsWith("Bearer")){
//         token = token.slice(7,token.length);
//     }
//     if(token){
//         jwt.verify(token,'Pankaj Parmar',(err,decoded) => {
//             if(err){
//                  res.json({
//                     success: false,
//                     message:"token is not correct"
//                 });
//             }
//             else{
//                 req.body.decoded=decoded;
//                 //next();
//             }
//         });
//     }
//     else{
//          res.status(401).json({
//             success: false,
//             error:"token is not"
//         })
//     }
// }

export {
    auth_Login,
    auth
}