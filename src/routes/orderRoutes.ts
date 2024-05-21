import express from 'express';
import OrderController from '../controllers/OrderController';
const router = express.Router();

// order routes

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/order/:id', OrderController.getOrder);
router.put('/order/:id', OrderController.updateOrder);
router.delete('/order/:id', OrderController.deleteOrder);

export default router;
