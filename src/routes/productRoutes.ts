import express from 'express';
import ProductController from '../controllers/ProductController';
import OrderController from '../controllers/OrderController';
const router = express.Router();

router.post('/create-product', ProductController.createProduct);
router.get('/create-product/:id', ProductController.getProduct);
router.put('/create-product/:id', ProductController.updateProduct);
router.delete('/create-product/:id', ProductController.deleteProduct);
router.get('/all-products', ProductController.getAllProducts);
router.get('/search', ProductController.searchProducts);

// order routes

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/order/:id', OrderController.getOrder);
router.put('/order/:id', OrderController.updateOrder);
router.delete('/order/:id', OrderController.deleteOrder);

export default router;
