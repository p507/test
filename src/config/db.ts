import mongoose,{connect} from 'mongoose';

function connection(){
 return connect("mongodb://localhost:27017/Student")
.then(()=>{console.log("connection is succesful")})
.catch((err)=>{console.log(err)});
}

export default connection;