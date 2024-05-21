import ProductModel from '../models/productModel';
import ProductInterface from '../interfaces/productInteface';

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
};

export default ProductService;
