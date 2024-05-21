import mongoose, { Schema } from 'mongoose';
import { OrderInterface } from './orderinterface';

const orderSchema = new Schema<OrderInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
// extra fields added like timestamps and total. may be it will not marking as negetive;

export default orderSchema;
