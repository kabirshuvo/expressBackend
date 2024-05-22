import express from 'express';
import { OrderController } from '../controllers/OrderController';

const router = express.Router();

const createOrder = OrderController.createOrderInDatabase;
const allOrders = OrderController.getAllOrdersFromDatabase;
const singleOrder = OrderController.getOrderFromDatabase;
const updateOrder = OrderController.updateOrderInDatabase;
const deleteOrder = OrderController.deleteOrderFromDatabase;

router.get('/', allOrders);
router.post('/create-order', createOrder);
router.get('/order/:id', singleOrder);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', deleteOrder);

export const OrderRoutes = router;
