"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getSingleUser = exports.loginUser = exports.registerUser = void 0;
const usermodel_1 = require("../models/usermodel");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function registerUser(req, res) {
    try {
        const validationRegister = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validationRegister.error) {
            return res.status(400).json({
                Error: validationRegister.error.details[0].message,
            });
        }
        const emailDuplicates = await usermodel_1.UserModel.findOne({ email: req.body.email });
        if (emailDuplicates) {
            return res.status(409).json({
                msg: 'Email has been used, please change email',
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const newUser = new usermodel_1.UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            date_of_birth: req.body.date_of_birth,
            phonenumber: req.body.phonenumber,
            password: passwordHash,
        });
        const record = await newUser.save();
        if (record) {
            res.status(201).json({
                message: `you have sucessfully created a user ${req.body.firstname}`,
                record,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to register',
            route: '/register',
        });
    }
}
exports.registerUser = registerUser;
async function loginUser(req, res) {
    try {
        const validateLogin = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validateLogin.error) {
            return res.status(400).json({
                Error: validateLogin.error.details[0].message
            });
        }
        const user = (await usermodel_1.UserModel.findOne({ email: req.body.email }));
        const { id } = user;
        const token = (0, utils_1.generateToken)({ id });
        const validateUser = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validateUser) {
            res.status(401).json({
                msg: "email or password do not match",
            });
        }
        else {
            res.cookie('auth', token, {
                httpOnly: true,
                secure: true,
            });
            res.cookie('id', id, {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({
                message: 'Login successful',
                token,
                user,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'failed to login',
            route: '/login',
        });
    }
}
exports.loginUser = loginUser;
async function getSingleUser(req, res) {
    try {
        const record = await usermodel_1.UserModel.findById(req.params.id);
        if (record) {
            return res.status(200).json({
                message: 'Single User fetched successfully',
                record,
            });
        }
        else {
            return res.status(404).json({
                message: 'User does not exist'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'failed to fetch single user information',
            route: '/getsingleuser',
        });
    }
}
exports.getSingleUser = getSingleUser;
async function getAllUsers(req, res) {
    try {
        const users = await usermodel_1.UserModel.find().limit(10).sort({ lastname: 1 });
        if (users) {
            return res.status(200).json({
                message: 'Users fetched successfully',
                users,
            });
        }
        else {
            return res.status(404).json({
                message: 'Users does not exist',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'failed to fetch users information',
            route: '/getallusers',
        });
    }
}
exports.getAllUsers = getAllUsers;
async function updateUser(req, res) {
    const id = req.params.id;
    const { firstname, lastname, email, gender, date_of_birth, phonenumber, password } = req.body;
    try {
        const userUpdate = await usermodel_1.UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (userUpdate) {
            return res.status(201).json({
                message: 'User updated successfully',
                userUpdate,
            });
        }
        else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'failed to update user information',
            route: '/updateuser',
        });
    }
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    const id = req.params.id;
    try {
        const deletePerson = await usermodel_1.UserModel.findByIdAndDelete(id);
        if (deletePerson) {
            return res.status(200).json({
                message: 'User deleted successfully',
                deletePerson,
            });
        }
        else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'failed to delete user information',
            route: '/deleteuser',
        });
    }
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map