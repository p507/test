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
exports.Reactivate = exports.Delete_User_Profile = exports.Update_User_Profile = exports.Get_User_Profile = exports.log_in = exports.sign_up = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const md5_1 = __importDefault(require("md5"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_1 = __importDefault(require("../models/users"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const sign_up = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = new users_1.default(req.body);
        let token = jsonwebtoken_1.default.sign({ _id: doc._id }, 'Pankaj Parmar');
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 300000)
        });
        console.log(token);
        const data = yield doc.save();
        res.json({ message: "sign_up successful" });
    }
    catch (err) {
        console.log(err);
        res.json({ error: err });
    }
});
exports.sign_up = sign_up;
const log_in = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        let { username, password } = req.body;
        password = (0, md5_1.default)(password);
        const query = { username: username, password: password };
        const data = yield users_1.default.findOne(query);
        console.log(data);
        if (data) {
            console.log("data found");
        }
        else {
            console.log("data not found");
        }
        const token = req.cookies.jwt;
        if (token == undefined && data) {
            let tokenGen = jsonwebtoken_1.default.sign({ _id: data === null || data === void 0 ? void 0 : data._id }, 'Pankaj Parmar');
            res.cookie('jwt', tokenGen, {
                expires: new Date(Date.now() + 300000)
            });
            if (data) {
                res.status(200).json({ message: "log in successfully" });
            }
            else {
                res.json({ message: "no match found" });
            }
        }
        else {
            if (data) {
                res.status(200).json({ message: "already logged in" });
            }
            else {
                res.json({ message: "no match found" });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});
exports.log_in = log_in;
const Get_User_Profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield users_1.default.findById(req.body.id);
        res.status(201).json({ All_Details: data });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.Get_User_Profile = Get_User_Profile;
const Update_User_Profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    const token = req.cookies.jwt;
    const decoded = jsonwebtoken_1.default.verify(token, 'Pankaj Parmar');
    console.log(decoded);
    //   console.log(typeof decoded);
    const doc = JSON.parse(JSON.stringify(decoded));
    console.log(doc);
    console.log(doc._id);
    password = (0, md5_1.default)(password);
    try {
        const updatedocu = yield users_1.default.findByIdAndUpdate(doc._id, { username: username, password: password }, {
            new: true
        });
        res.status(200).json({ Updated_Details: updatedocu });
    }
    catch (err) {
        res.status(400).json({ Error: err });
    }
});
exports.Update_User_Profile = Update_User_Profile;
const Delete_User_Profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedata = yield users_1.default.findByIdAndDelete(req.body.id);
        res.status(200).json({ Deleted_Details: deletedata });
    }
    catch (err) {
        res.status(400).json({ Error: err });
    }
});
exports.Delete_User_Profile = Delete_User_Profile;
const Reactivate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        let password = req.body.password;
        password = (0, md5_1.default)(password);
        const query = { username: username, password: password };
        const data = yield users_1.default.findOne(query);
        if ((data === null || data === void 0 ? void 0 : data.status) === true) {
            res.status(200).json({ message: "user already activated" });
        }
        else {
            const updatedocu = yield users_1.default.findByIdAndUpdate(data === null || data === void 0 ? void 0 : data.id, { status: true }, {
                new: true
            });
            res.status(200).json({ Updated_Details: updatedocu });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ Error: err });
    }
});
exports.Reactivate = Reactivate;
