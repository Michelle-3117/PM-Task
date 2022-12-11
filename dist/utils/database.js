"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const URL = process.env.MONGO_URI;
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(URL).then(() => console.log('database connected successfully'));
    }
    catch (error) {
        console.log(`database was unable to connect: ${error}`);
    }
};
exports.connectDb = connectDb;
//# sourceMappingURL=database.js.map