import { Types } from 'mongoose';

export interface OrderInterface {
  email: string;
  productId?: Types.ObjectId;
  price: number;
  quantity: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
