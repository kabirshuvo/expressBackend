import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import connectDB from './server';
import { ProductRouter } from './routes/productRoutes';
import { OrderRoutes } from './routes/OrderRoutes';

const app: Application = express();
app.use(express.json());
app.use(cors());
connectDB();

// Middlewares

app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
