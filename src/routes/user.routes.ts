import { validateBody } from '#middlewares/validateBody.js'
import { verifyAccessToken } from '#middlewares/verifyAccessToken.js'
import { deleteAccount, deleteSchema, editsAcccountInfo, getAnyParticularUser, getUsers, updateSchema,  } from '#services/userService.js'
import express from 'express'
const router = express.Router()
router.get('/get_users_accounts', verifyAccessToken,  getUsers )
router.get('/get_particular_user_account/:id',verifyAccessToken, getAnyParticularUser )
router.put('/edit_account/:id',validateBody(updateSchema),verifyAccessToken, editsAcccountInfo)
router.delete('/delete_account/:id',validateBody(deleteSchema), verifyAccessToken, deleteAccount)
export default router;    