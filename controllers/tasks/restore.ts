import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middlewares/auth';

const prisma = new PrismaClient();

export const restoreTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const task = await prisma.task.findFirst({
      where: { id, userId, isDeleted: true }
    });

    if (!task) {
      return res.status(404).json({ error: 'Deleted task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { isDeleted: false }
    });

    res.json({ 
      message: 'Task restored successfully',
      task: updatedTask
    });
  } catch (error) {
    console.error('Restore task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};