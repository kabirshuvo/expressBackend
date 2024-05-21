import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  productId: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

export default orderSchema;
