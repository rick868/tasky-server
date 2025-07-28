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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const { firstName, lastName, username, email, profilePicture } = req.body;
        const existingUser = yield prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
                NOT: { id: userId }
            }
        });
        if (existingUser) {
            return res.status(400).json({
                error: existingUser.email === email ? 'Email already exists' : 'Username already exists'
            });
        }
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                username,
                email,
                profilePicture,
                updatedAt: new Date()
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                profilePicture: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    }
    catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateUser = updateUser;
