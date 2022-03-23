import express , {Request, Response} from 'express';7
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import User from '../models/users';
const app = express();
app.use(express.json());
app.use(cookieParser());


const sign_up = async(req:Request, res:Response) => {
      try{ 
          const doc = new User(req.body); 
           let token = jwt.sign({_id:doc._id},'Pankaj Parmar');
           res.cookie('jwt',token,{
               expires: new Date(Date.now() + 300000)
           });
           console.log(token);
           
          const data = await doc.save();
          res.json({message:"sign_up successful"});
      }catch(err){
          console.log(err);
          res.json({error:err});     
      }
}

const log_in =  async (req:Request, res:Response)=>{ 
    try{
        let {username,password} = req.body; 
        password = md5(password);
        const query = {username:username, password:password};
        const data = await User.findOne(query);
        console.log(data);
        if(data){
            console.log("data found");    
        }else{
            console.log("data not found");   
        }
        const token = req.cookies.jwt;
        if(token==undefined && data){
            let tokenGen = jwt.sign({_id:data?._id},'Pankaj Parmar');
            res.cookie('jwt',tokenGen,{
                expires: new Date(Date.now() + 300000)
            });
            if(data){   
                res.status(200).json({message:"log in successfully"});
            }else{
                res.json({message:"no match found"});
            }
       }else{
        if(data){ 
            res.status(200).json({message:"already logged in"});
        }
        else{
            res.json({message:"no match found"});
        }
       }
    }catch(err){
        console.log(err);
        res.send(err);
    }
}


const Get_User_Profile = async(req:Request, res:Response) => {  
    try{
        const data = await User.findById(req.body.id);
        res.status(201).json({All_Details: data});
   }catch(err){
        res.status(400).json({error: err});
   }
}

const Update_User_Profile = async(req:Request, res:Response)=>{
      let username = req.body.username;
      let password = req.body.password;
      const token = req.cookies.jwt;
      const decoded:any = jwt.verify(token,'Pankaj Parmar',(err:any,decoded:any)=>{
           if(err){
               console.log(err);
               
           }else{
               console.log(decoded._id);
               
           }
      })
      console.log(decoded); 
    //   console.log(typeof decoded);
     decoded._id
      const doc = JSON.parse(JSON.stringify(decoded));
      console.log(doc); 
      console.log(doc._id); 
      password = md5(password);
    try{
        const updatedocu = await User.findByIdAndUpdate(doc._id,{username:username, password:password},{
             new : true
        })
        res.status(200).json({Updated_Details:updatedocu});
   }catch(err){
        res.status(400).json({Error:err});
   }
}

const Delete_User_Profile = async(req:Request, res:Response)=>{
    try{
        const deletedata = await User.findByIdAndDelete(req.body.id);
        res.status(200).json({Deleted_Details:deletedata});
    }catch(err){
        res.status(400).json({Error:err});
    }
}

const Reactivate = async(req:Request, res:Response)=>{
    try{
        const username = req.body.username;
        let password = req.body.password;
        password = md5(password);
        const query = {username:username, password:password};
          const data = await User.findOne(query);
       if(data?.status===true){
           res.status(200).json({message:"user already activated"});
       }else{
        const updatedocu = await User.findByIdAndUpdate(data?.id,{status:true},{
            new : true
       })
       res.status(200).json({Updated_Details:updatedocu});
       }
    }catch(err){
        console.log(err);
        res.status(400).json({Error:err});
    }
}



export {
    sign_up,
    log_in,
    Get_User_Profile,
    Update_User_Profile,
    Delete_User_Profile,
    Reactivate
}

