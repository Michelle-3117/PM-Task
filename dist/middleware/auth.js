"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const usermodel_1 = require("../models/usermodel");
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization && !req.cookies.auth) {
            res.status(401).send({
                Error: 'Kindly sign in as a user',
            });
        }
        const token = (authorization === null || authorization === void 0 ? void 0 : authorization.slice(7, authorization.length)) || req.cookies.auth;
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: 'User not verified, you cant access this route',
            });
        }
        const { id } = verified;
        const user = await usermodel_1.UserModel.findById(id);
        if (!user) {
            return res.status(404).json({
                Error: 'User not verified',
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(403).json({
            Error: 'User not logged in'
        });
    }
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map