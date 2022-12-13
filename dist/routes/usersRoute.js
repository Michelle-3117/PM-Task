"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.get('/getsingleuser/:id', auth_1.auth, userController_1.getSingleUser);
router.get('/getallusers', userController_1.getAllUsers);
router.patch('/updateuser/:id', auth_1.auth, userController_1.updateUser);
router.delete('/deleteuser/:id', auth_1.auth, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=usersRoute.js.map