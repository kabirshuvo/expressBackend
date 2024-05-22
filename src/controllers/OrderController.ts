import { Request, Response } from 'express';
import { OrderService } from '../modules/orders/orderservices';
import { createOrderValidationSchema } from '../schemas/orderValidationSchema';

interface CustomError extends Error {
  statusCode?: number;
}

// Create Order
const createOrderInDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Validate the request body
    const result = createOrderValidationSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.errors,
      });
      return;
    }

    // Use the validated data
    // getting error at result.data
    //     Argument of type '{ email: string; productId: string; price: number; quantity: number; }' is not assignable to parameter of type 'OrderInterface'.
    //   Type '{ email: string; productId: string; price: number; quantity: number; }' is missing the following properties from type 'OrderInterface': total, createdAt, updatedAt, $assertPopulated, and 50 more.ts(2345)
    // const result: SafeParseSuccess<{
    //     email: string;
    //     productId: string;
    //     price: number;
    //     quantity: number;
    // }>
    // No quick fixes available
    const newOrder = await OrderService.createOrder(result.data);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong during order creation',
      error: error.message,
    });
  }
};

// Get All Orders
const getAllOrdersFromDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await OrderService.getAllOrders();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching orders',
      error: error.message,
    });
  }
};

// Get An Order By ID
const getOrderFromDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const result = await OrderService.getOrder(orderId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the order',
      error: error.message,
    });
  }
};

// Update an Order
const updateOrderInDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    const result = await OrderService.updateOrder(orderId, orderData);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Order updated successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating the order',
      error: error.message,
    });
  }
};

// Delete an Order
const deleteOrderFromDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const orderId = req.params.id;
    await OrderService.deleteOrder(orderId);
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully!',
      data: null,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the order',
      error: error.message,
    });
  }
};

// Export all functionality
export const OrderController = {
  createOrderInDatabase,
  getAllOrdersFromDatabase,
  getOrderFromDatabase,
  updateOrderInDatabase,
  deleteOrderFromDatabase,
};
