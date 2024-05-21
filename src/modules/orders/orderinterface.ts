import { Document, Types } from 'mongoose';

export interface OrderInterface extends Document {
  email: string;
  productId: Types.ObjectId;
  price: number;
  quantity: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
