import { verifyAccessToken } from '#middlewares/verifyAccessToken.js';
import { verifyPayment } from '#services/verifyPayment.js';
import express from 'express';
const router = express.Router();
router.post('/verify_payment', verifyAccessToken, verifyPayment);
export default router;
//# sourceMappingURL=verifyPament.js.map