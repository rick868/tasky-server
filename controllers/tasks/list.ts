import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middlewares/auth';

const prisma = new PrismaClient();

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { status } = req.query;

    let where: any = { userId };

    if (status === 'completed') {
      where.isCompleted = true;
      where.isDeleted = false;
    } else if (status === 'deleted') {
      where.isDeleted = true;
    } else {
      
      where.isCompleted = false;
      where.isDeleted = false;
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};