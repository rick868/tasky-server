import { Router } from 'express';
import { getUser } from '../controllers/user/get';
import { updateUser } from '../controllers/user/update';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', getUser);
router.patch('/', updateUser);

export default router;