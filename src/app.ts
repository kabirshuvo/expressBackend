import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import connectDB from './server';
import productRoutes from './routes/productRoutes';

const app: Application = express();
app.use(express.json());
app.use(cors());
connectDB();

// Middlewares

app.use('/api/products', productRoutes);
app.use('/api/orders', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
