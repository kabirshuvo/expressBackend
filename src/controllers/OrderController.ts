import { Request, Response } from 'express';
import OrderService from '../modules/orders/orderservices';
import ProductModel from '../modules/products/models/productModel';
import OrderModel from '../modules/orders/ordermodels';
import { createOrderValidationSchema } from '../schemas/orderValidationSchema';

const OrderController = {
  async createOrder(req: Request, res: Response) {
    try {
      // Validate the request body
      const result = createOrderValidationSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: result.error.errors,
        });
      }

      const { productId, quantity, email, price } = result.data;

      // Retrieving the product details
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }

      // Checking if the ordered quantity exceeds available quantity
      if (quantity > product.inventory.quantity) {
        return res
          .status(400)
          .json({ success: false, message: 'Insufficient stock' });
      }

      // Subtracting the ordered quantity from available quantity
      const updatedQuantity = product.inventory.quantity - quantity;

      // Update the product's inventory
      await ProductModel.findByIdAndUpdate(
        productId,
        {
          'inventory.quantity': updatedQuantity,
          'inventory.inStock': updatedQuantity > 0,
        },
        { new: true },
      );

      // Create a new order document
      const newOrder = await OrderModel.create({
        email,
        productId,
        price,
        quantity,
        total: price * quantity, // Calculate the total price
      });

      // Respond with the created order data
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: newOrder,
      });
    } catch (error) {
      const err = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: `Error creating order: ${err.message}`,
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
