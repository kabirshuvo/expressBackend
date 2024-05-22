import ProductModel from '../models/productModel';
import ProductInterface from '../interfaces/productInteface';
import { ProductFilter, ProductQuery } from '../interfaces/quiryInteface';

// Create Product
export const createProduct = async (
  product: ProductInterface,
): Promise<ProductInterface> => {
  try {
    const result = await ProductModel.create(product);
    return result;
  } catch (error) {
    throw new Error('Error creating product');
  }
};

// Get All Products
export const getAllProducts = async (): Promise<ProductInterface[]> => {
  try {
    const products = await ProductModel.find({});
    return products;
  } catch (error) {
    throw new Error('Error getting all products');
  }
};

// Get Product by ID
export const getProduct = async (
  productId: string,
): Promise<ProductInterface | null> => {
  try {
    const product = await ProductModel.findById(productId);
    return product;
  } catch (error) {
    throw new Error('Error getting product');
  }
};

// Update Product
export const updateProduct = async (
  productId: string,
  productData: Partial<ProductInterface>,
): Promise<ProductInterface | null> => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      productData,
      { new: true },
    );
    return updatedProduct;
  } catch (error) {
    throw new Error('Error updating product');
  }
};

// Delete Product
export const deleteProduct = async (
  productId: string,
): Promise<ProductInterface | null> => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw new Error('Error deleting product');
  }
};

// Search Products
export const searchProducts = async (
  query: ProductQuery,
): Promise<ProductInterface[]> => {
  try {
    const filter: ProductFilter = {};
    if (query.name) filter.name = { $regex: query.name, $options: 'i' };
    if (query.category)
      filter.category = { $regex: query.category, $options: 'i' };
    if (query.price) filter.price = { $lte: Number(query.price) };
    if (query.tags) filter.tags = { $in: query.tags.split(',') };

    const products = await ProductModel.find(filter);
    return products;
  } catch (error) {
    throw new Error('Error searching products');
  }
};

// Export all service functions
export const ProductService = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
