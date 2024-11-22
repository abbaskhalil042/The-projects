import express from 'express'
import { protectedRoute } from '../middlewares/protectedRouter.js'
import { getMessages, getuserForSidebar ,sendMsg} from '../controllers/message.controller.js'

const router = express.Router()

router.get('/users',protectedRoute,getuserForSidebar)
router.get("/:id",protectedRoute,getMessages)

router.post("/send/:id",protectedRoute,sendMsg)


export default router