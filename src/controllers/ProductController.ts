import { Request, Response } from 'express';
import ProductService from '../modules/products/services/ProductServices';

const ProductController = {
  async createProduct(req: Request, res: Response) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json({
        success: true,
        message: 'Product created successfully!',
        data: newProduct,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error creating product',
        error: err.message,
      });
    }
  },

  async getProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const product = await ProductService.getProduct(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error getting product',
        error: err.message,
      });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const updatedProduct = await ProductService.updateProduct(
        productId,
        req.body,
      );
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: updatedProduct,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error updating product',
        error: err.message,
      });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const deletedProduct = await ProductService.deleteProduct(productId);
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error deleting product',
        error: err.message,
      });
    }
  },

  async searchProducts(req: Request, res: Response) {
    try {
      const query = req.query;
      const products = await ProductService.searchProducts(query);
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error searching products',
        error: err.message,
      });
    }
  },
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      const err: Error = error as Error;
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Error getting all products',
        error: err.message,
      });
    }
  },
};

export default ProductController;
