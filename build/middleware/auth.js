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
exports.auth = exports.auth_Login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        //console.log(token);
        if (token == undefined) {
            next();
        }
        else {
            const verifyUser = jsonwebtoken_1.default.verify(token, 'Pankaj Parmar');
            console.log(verifyUser);
            next();
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err });
    }
});
exports.auth_Login = auth_Login;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        // console.log(token);
        const verifyUser = jsonwebtoken_1.default.verify(token, 'Pankaj Parmar');
        // console.log(verifyUser);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err });
    }
});
exports.auth = auth;
