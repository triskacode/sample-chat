import { Router } from "express"
import { UserController } from "./controllers/index.js"
import { middleware } from "./middleware/index.js"

const router = Router()

router.post("/user-detail", UserController.detail)
router.post("/user-find", middleware.auth, UserController.find)
router.post("/user-push-chat", middleware.auth, UserController.pushChat)
router.post("/user-search", middleware.auth, UserController.search)

export default router