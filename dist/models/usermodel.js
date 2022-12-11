"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.gender = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var gender;
(function (gender) {
    gender["male"] = "male";
    gender["female"] = "female";
})(gender = exports.gender || (exports.gender = {}));
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: [true, 'First name is required'] },
    lastname: { type: String, required: [true, 'Last name is required'] },
    email: {
        type: String,
        unique: [true, 'Sorry! this email already exist '],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    gender: { type: [String], enum: gender, required: true },
    phonenumber: {
        type: String,
        require: [true, "Phone number is required"],
    },
    password: { type: String, required: true },
    date_of_birth: { type: String },
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.default.model('UserModel', userSchema);
//# sourceMappingURL=usermodel.js.map