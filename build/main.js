"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./Routes/routes");
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
(0, db_1.default)();
app.use('/', routes_1.router);
app.listen(port, () => {
    console.log("listen to server");
});
