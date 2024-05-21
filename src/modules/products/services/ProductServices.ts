import ProductModel from '../models/productModel';
import ProductInterface from '../interfaces/productInteface';
import { ProductFilter, ProductQuery } from '../interfaces/quiryInteface';

const ProductService = {
  async createProduct(
    productData: ProductInterface,
  ): Promise<ProductInterface> {
    try {
      const newProduct = await ProductModel.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error('Error creating product');
    }
  },
  async getAllProducts(): Promise<ProductInterface[]> {
    try {
      const products = await ProductModel.find({});
      return products;
    } catch (error) {
      throw new Error('Error getting all products');
    }
  },
  async getProduct(productId: string): Promise<ProductInterface | null> {
    try {
      const product = await ProductModel.findById(productId);
      return product;
    } catch (error) {
      throw new Error('Error getting product');
    }
  },

  async updateProduct(
    productId: string,
    productData: Partial<ProductInterface>,
  ): Promise<ProductInterface | null> {
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
  },

  async deleteProduct(productId: string): Promise<ProductInterface | null> {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw new Error('Error deleting product');
    }
  },

  async searchProducts(query: ProductQuery): Promise<ProductInterface[]> {
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
  },
};

export default ProductService;
