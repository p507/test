import mongoose,{Schema,model} from 'mongoose';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

interface User{
    username:string;
    password:string;
    email:string;
    status:Boolean
}

const Userschema = new Schema<User>({
    username: { 
        type: String,
        required: true
      },
      password:{ 
        type: String,
        required:true
      },
      email: { 
          type: String,
          required:true
      },
      status: {
          type: Boolean,
          required:true
      },
})


Userschema.pre("save", async function(next){
    try{
     if(this.isModified("password")){
         console.log(`the current password is ${this.password}`);
         this.password = await md5(this.password);
         console.log(`the current password is ${this.password}`);
         next();
        }
    }catch(err){
        console.log(err);
    }
 
 })



const User = model<User>('user',Userschema)

export default User;





// Userschema.methods.generateAuthToken = async function(){
//     try{
//         console.log(this._id);
//         const token = jwt.sign({_id: this._id},'pankajparmar');
//         console.log(token);
//         return token;    
//     }catch(err){
//         //res.send(err);
//         console.log(err);     
//     }
// }