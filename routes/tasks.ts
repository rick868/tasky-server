import { Router } from 'express';
import { createTask } from '../controllers/tasks/create';
import { getTasks } from '../controllers/tasks/list';
import { updateTask } from '../controllers/tasks/update';
import { deleteTask } from '../controllers/tasks/delete';
import { getTask } from '../controllers/tasks/get';
import { incompleteTask } from '../controllers/tasks/incomplete';
import { completeTask } from '../controllers/tasks/complete';
import { restoreTask } from '../controllers/tasks/restore';
import { authenticateToken } from '../middlewares/auth'; 

const router = Router();

router.use(authenticateToken);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/restore/:id', restoreTask);
router.patch('/complete/:id', completeTask);
router.patch('/incomplete/:id', incompleteTask);

export default router;