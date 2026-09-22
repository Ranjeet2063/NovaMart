import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/adminController';
import { adminOnly, protect } from '../middleware/auth';

const router = Router();

router.use(protect, adminOnly);
router.get('/metrics', getDashboardMetrics);

export default router;
