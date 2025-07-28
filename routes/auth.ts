import { Router } from 'express';
import { register, login, logout, updatePassword } from '../controllers/auth/authController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/password', authenticateToken, updatePassword);

export default router;