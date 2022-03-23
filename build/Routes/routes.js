"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
// console.log(sign_up);
const auth_1 = require("../middleware/auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router = express_1.default.Router();
exports.router = router;
const app = (0, express_1.default)();
app.use(express_1.default.json());
router.use((0, cookie_parser_1.default)());
router.post('/signup', user_1.sign_up);
router.post('/login', auth_1.auth_Login, user_1.log_in);
router.get('/getuserprofile', auth_1.auth, user_1.Get_User_Profile);
router.patch('/updateuserprofile', auth_1.auth, user_1.Update_User_Profile);
router.delete('/deleteuserprofile', auth_1.auth, user_1.Delete_User_Profile);
router.post('/Reactivate', auth_1.auth, user_1.Reactivate);
