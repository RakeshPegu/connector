import { validateBody } from '#middlewares/validateBody.js'
import { verifyAccessToken } from '#middlewares/verifyAccessToken.js'
import { createPlan, deleteAPlan, getAPlanDetails, getPlans, planSchema } from '#services/planService.js'
import express from 'express'
const router = express.Router()
router.post('create_plan', validateBody(planSchema), verifyAccessToken, createPlan )
router.get('/get_all_plans', getPlans)
router.get('/get_a_plan/:id', getAPlanDetails)
router.delete('/delete_a_plan/:id', verifyAccessToken, deleteAPlan)
export default router;