import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import connectDB from './server';
import productRoutes from './routes/productRoutes';

const app: Application = express();

connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

app.use('/api/v1/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
