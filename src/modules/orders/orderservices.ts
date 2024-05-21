import OrderModel from './ordermodels';
// import OrderInterface from './orderInterface';
import { OrderInterface } from './orderinterface';

const OrderService = {
  async createOrder(orderData: OrderInterface): Promise<OrderInterface> {
    try {
      // Calculate total price
      orderData.total = orderData.price * orderData.quantity;

      const newOrder = await OrderModel.create(orderData);
      return newOrder;
    } catch (error) {
      throw new Error('Error creating order');
    }
  },

  async getOrder(orderId: string): Promise<OrderInterface | null> {
    try {
      const order = await OrderModel.findById(orderId).populate('productId');
      return order;
    } catch (error) {
      throw new Error('Error getting order');
    }
  },

  async getAllOrders(): Promise<OrderInterface[]> {
    try {
      const orders = await OrderModel.find();
      return orders;
    } catch (error) {
      throw new Error('Error retrieving orders');
    }
  },

  async updateOrder(
    orderId: string,
    orderData: Partial<OrderInterface>,
  ): Promise<OrderInterface | null> {
    try {
      if (orderData.price && orderData.quantity) {
        orderData.total = orderData.price * orderData.quantity;
      }

      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        orderData,
        { new: true },
      ).populate('productId');
      return updatedOrder;
    } catch (error) {
      throw new Error('Error updating order');
    }
  },

  async deleteOrder(orderId: string): Promise<OrderInterface | null> {
    try {
      const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
      return deletedOrder;
    } catch (error) {
      throw new Error('Error deleting order');
    }
  },
};

export default OrderService;
