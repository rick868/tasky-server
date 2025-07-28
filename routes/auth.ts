import { Router } from 'express';
import { register, login, logout, updatePassword } from '../controllers/auth/authController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

// Add GET route for signin page requests
router.get('/signin', (req, res) => {
  res.json({ 
    message: 'Signin page', 
    loginEndpoint: '/api/auth/login',
    registerEndpoint: '/api/auth/register'
  });
});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/password', authenticateToken, updatePassword);

export default router;