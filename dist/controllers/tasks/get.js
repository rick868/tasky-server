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
exports.getTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const task = yield prisma.task.findFirst({
            where: {
                id,
                userId
            }
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ task });
    }
    catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getTask = getTask;
