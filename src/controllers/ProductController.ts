import { Request, Response } from 'express';
import { ProductService } from '../modules/products/services/ProductServices';
import { createProductValidationSchema } from '../schemas/productValidationSchema';
import { ProductQuery } from '../modules/products/interfaces/quiryInteface';

interface CustomError extends Error {
  statusCode?: number;
}

// Create Product
const createProductInDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Validate the request body
    const result = createProductValidationSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.errors,
      });
      return;
    }

    // Use the validated data
    const newProduct = await ProductService.createProduct(result.data);
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: newProduct,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong during product creation',
      error: error.message,
    });
  }
};

// Get All Products
const getAllProductsFromDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await ProductService.getAllProducts();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching products',
      error: error.message,
    });
  }
};

// Search Products
const searchProductsInDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const query = req.query as unknown as ProductQuery; // Ensure query is cast to correct type
    const result = await ProductService.searchProducts(query);
    res.status(200).json({
      success: true,
      message: 'Products matching search term fetched successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while searching products',
      error: error.message,
    });
  }
};

// Get A Single Product
const getProductFromDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId = req.params.productId;
    const result = await ProductService.getProduct(productId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the product',
      error: error.message,
    });
  }
};

// Update a Product
const updateProductInDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    const result = await ProductService.updateProduct(productId, productData);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating the product',
      error: error.message,
    });
  }
};

// Delete a Product
const deleteProductFromDatabase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId = req.params.productId;
    await ProductService.deleteProduct(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the product',
      error: error.message,
    });
  }
};

// Export all functionality
export const ProductController = {
  createProductInDatabase,
  getAllProductsFromDatabase,
  searchProductsInDatabase,
  getProductFromDatabase,
  updateProductInDatabase,
  deleteProductFromDatabase,
};
