import { Request, Response } from 'express';
import OrderService from '../modules/orders/orderservices';
import ProductModel from '../modules/products/models/productModel';
import OrderModel from '../modules/orders/ordermodels';

const OrderController = {
  async createOrder(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;

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

      // to Update the product's inventory
      await ProductModel.findByIdAndUpdate(
        productId,
        {
          'inventory.quantity': updatedQuantity,
          'inventory.inStock': updatedQuantity > 0,
        },
        { new: true },
      );

      // Creating  a new order document because of : when I'm Subtracting and updating the quantity then my data was not storing in ordercollection
      // so I created the newOrder here; and I'm finding the solution.
      const newOrder = await OrderModel.create({
        productId,
        quantity,
        price: product.price,
        total: product.price * quantity,
        email: req.body.email,
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
