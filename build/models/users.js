"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const md5_1 = __importDefault(require("md5"));
const Userschema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
});
Userschema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isModified("password")) {
                console.log(`the current password is ${this.password}`);
                this.password = yield (0, md5_1.default)(this.password);
                console.log(`the current password is ${this.password}`);
                next();
            }
        }
        catch (err) {
            console.log(err);
        }
    });
});
const User = (0, mongoose_1.model)('user', Userschema);
exports.default = User;
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
