import mongoose, { Model } from 'mongoose';
import ProductSchema from '../schemas/productSchema';
import ProductInterface from '../interfaces/productInteface';

type ProductDocument = mongoose.Document & ProductInterface;
type ProductModelType = Model<ProductDocument>;
const ProductModel: ProductModelType = mongoose.model<ProductDocument>(
  'Product',
  ProductSchema,
);

export default ProductModel;
