import express from 'express';
import { ProductController } from '../controllers/ProductController';
import OrderController from '../controllers/OrderController';

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

// order routes

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/order/:id', OrderController.getOrder);
router.put('/order/:id', OrderController.updateOrder);
router.delete('/order/:id', OrderController.deleteOrder);
export default router;
