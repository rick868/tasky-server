import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middlewares/auth';

const prisma = new PrismaClient();

export const incompleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const task = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.update({
      where: { id },
      data: { isCompleted: false }
    });

    res.json({ message: 'Task marked as incomplete' });
  } catch (error) {
    console.error('Incomplete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};