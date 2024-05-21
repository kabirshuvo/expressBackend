import express from 'express';
import ProductController from '../controllers/ProductController';

const router = express.Router();

router.post('/create-product', ProductController.createProduct);

router.get('/create-product/:id', ProductController.getProduct);

router.put('/create-product/:id', ProductController.updateProduct);

router.delete('/create-product/:id', ProductController.deleteProduct);

export default router;
