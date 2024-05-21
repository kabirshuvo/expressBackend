import { Document } from 'mongoose';
interface orderInterface extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export default orderInterface;
