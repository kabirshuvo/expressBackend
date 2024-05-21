import mongoose, { Model } from 'mongoose';
import { OrderInterface } from './orderInterface';
import orderSchema from './orderschema';

const OrderModel: Model<OrderInterface> = mongoose.model('Order', orderSchema);

export default OrderModel;
