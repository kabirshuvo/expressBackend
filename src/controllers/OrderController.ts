import { Request, Response } from 'express';
import OrderService from '../modules/orders/orderservices';

const OrderController = {
  async createOrder(req: Request, res: Response) {
    try {
      const newOrder = await OrderService.createOrder(req.body);
      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: newOrder,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error creating order',
        error: err.message,
      });
    }
  },
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error('Error from order controler: not getting any order');
      res.status(500).json({
        success: false,
        message: 'Error retrieving orders',
      });
    }
  },

  async getOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      const order = await OrderService.getOrder(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error getting order',
        error: err.message,
      });
    }
  },

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error getting all orders',
        error: err.message,
      });
    }
  },

  async updateOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      const updatedOrder = await OrderService.updateOrder(orderId, req.body);
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Order updated successfully!',
        data: updatedOrder,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error updating order',
        error: err.message,
      });
    }
  },

  async deleteOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      const deletedOrder = await OrderService.deleteOrder(orderId);
      if (!deletedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully!',
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error deleting order',
        error: err.message,
      });
    }
  },
};

export default OrderController;
