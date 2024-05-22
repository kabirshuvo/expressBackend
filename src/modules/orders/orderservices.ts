import OrderModel from './ordermodels';
import { OrderInterface } from './orderInterface';
import ProductModel from '../products/models/productModel';

export const createOrder = async (
  orderData: OrderInterface,
): Promise<OrderInterface> => {
  try {
    // Calculating total price
    orderData.total = orderData.price * orderData.quantity;

    const newOrder = await OrderModel.create(orderData);
    return newOrder;
  } catch (error) {
    throw new Error('Error creating order');
  }
};

export const updateInventory = async (
  productId: string,
  orderedQuantity: number,
): Promise<void> => {
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Checking if ordered quantity exceeds available quantity
    if (orderedQuantity > product.inventory.quantity) {
      throw new Error('Insufficient stock');
    }

    // Updating inventory quantity and inStock status
    product.inventory.quantity -= orderedQuantity;
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    }

    await product.save();
  } catch (error) {
    throw new Error('Error updating inventory: error from orderservices ');
  }
};

export const getOrder = async (
  orderId: string,
): Promise<OrderInterface | null> => {
  try {
    const order = await OrderModel.findById(orderId).populate('productId');
    return order;
  } catch (error) {
    throw new Error('Error getting order');
  }
};

export const getAllOrders = async (): Promise<OrderInterface[]> => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error) {
    throw new Error('Error retrieving orders');
  }
};

export const updateOrder = async (
  orderId: string,
  orderData: Partial<OrderInterface>,
): Promise<OrderInterface | null> => {
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
};

export const deleteOrder = async (
  orderId: string,
): Promise<OrderInterface | null> => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    return deletedOrder;
  } catch (error) {
    throw new Error('Error deleting order');
  }
};

export const OrderService = {
  createOrder,
  updateInventory,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
