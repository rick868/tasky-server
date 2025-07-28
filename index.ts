import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/user';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'https://tasky-client-s65i.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true }));

// Add root-level signin route for frontend compatibility
app.get('/signin', (req, res) => {
  res.json({ 
    message: 'Please use POST /api/auth/login to authenticate',
    loginEndpoint: '/api/auth/login',
    registerEndpoint: '/api/auth/register'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

app.get('/health', (req, res) => {
   res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
