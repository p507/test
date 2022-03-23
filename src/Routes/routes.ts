import express , {Request, Response} from 'express';
import { sign_up,log_in,Get_User_Profile,Update_User_Profile,Delete_User_Profile,Reactivate} from '../controllers/user';
// console.log(sign_up);

import {auth_Login,auth} from '../middleware/auth';
 import cookieParser from 'cookie-parser';

const router = express.Router();
const app = express();
app.use(express.json());
router.use(cookieParser());

router.post('/signup', sign_up);
router.post('/login',auth_Login,log_in);
router.get('/getuserprofile',auth,Get_User_Profile);
router.patch('/updateuserprofile',auth,Update_User_Profile);
router.delete('/deleteuserprofile',auth,Delete_User_Profile);
router.post('/Reactivate',auth,Reactivate);

export {
    router
}