import mongoose, { Model } from 'mongoose';
import orderSchema from './orderschema';
import orderInterface from './orderinterface';

type OrderDocument = mongoose.Document & orderInterface;
type OrderModelType = Model<OrderDocument>;
const OrderModel: OrderModelType = mongoose.model<OrderDocument>(
  'Order',
  orderSchema,
);

export default OrderModel;
