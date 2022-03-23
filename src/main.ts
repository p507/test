import express from 'express';
import {router} from './Routes/routes';
import connection from './config/db';
const app = express();
app.use(express.json());
const port = 3000;
connection();


app.use('/',router);


app.listen(port,():void => {
   console.log("listen to server");
   
});