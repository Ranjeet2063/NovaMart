import { Router } from 'express';
import { createCheckoutSession, getMyOrders } from '../controllers/orderController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);
router.post('/checkout', createCheckoutSession);
router.get('/my-orders', getMyOrders);

export default router;
