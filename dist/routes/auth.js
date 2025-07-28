"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/auth/authController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Add GET route for signin page requests
router.get('/signin', (req, res) => {
    res.json({
        message: 'Signin page',
        loginEndpoint: '/api/auth/login',
        registerEndpoint: '/api/auth/register'
    });
});
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.post('/logout', authController_1.logout);
router.patch('/password', auth_1.authenticateToken, authController_1.updatePassword);
exports.default = router;
