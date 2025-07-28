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
exports.restoreTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const restoreTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const task = yield prisma.task.findFirst({
            where: { id, userId, isDeleted: true }
        });
        if (!task) {
            return res.status(404).json({ error: 'Deleted task not found' });
        }
        yield prisma.task.update({
            where: { id },
            data: { isDeleted: false }
        });
        res.json({ message: 'Task restored successfully' });
    }
    catch (error) {
        console.error('Restore task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.restoreTask = restoreTask;
