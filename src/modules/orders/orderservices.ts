import OrderModel from './ordermodels';
import orderInterface from './orderinterface';

const OrderServices = {
  async createOrder(orderData: orderInterface): Promise<orderInterface> {
    try {
      const newOrder = await OrderModel.create(orderData);
      return newOrder;
    } catch (error) {
      throw new Error('Error creating order');
    }
  },
  async getOrdes(orderId: string): Promise<orderInterface | null> {
    try {
      const orders = await OrderModel.findById(orderId);
      return orders;
    } catch (error) {
      throw new Error('err: orders not found');
    }
  },
};

export default OrderServices;
