import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middlewares/auth';

const prisma = new PrismaClient();

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.user!.userId;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId
      }
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};