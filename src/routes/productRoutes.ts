import express from 'express';
import { ProductController } from '../controllers/ProductController';

const router = express.Router();

const getAllProduct = ProductController.getAllProductsFromDatabase;
const createANewProduct = ProductController.createProductInDatabase;
const getSingleProduct = ProductController.getProductFromDatabase;
const updateProduct = ProductController.updateProductInDatabase;
const deleteAProduct = ProductController.deleteProductFromDatabase;
const searchProduct = ProductController.searchProductsInDatabase;

// Product routes
router.get('/', getAllProduct);
router.post('/create-product', createANewProduct);
router.get('/create-product/:id', getSingleProduct);
router.put('/create-product/:id', updateProduct);
router.delete('/create-product/:id', deleteAProduct);
router.get('/search', searchProduct);

export const ProductRouter = router;
