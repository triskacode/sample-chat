import { Router } from "express"
import { UserController } from "./controllers/index.js"
import { middleware } from "./middleware/index.js"

const router = Router()

router.post("/user-detail", UserController.detail)
router.post("/user-detail-login", UserController.detailLogin)
router.post("/user-clear-message", middleware.auth, UserController.clearMessage)
router.post("/user-find", middleware.auth, UserController.find)
router.post("/user-pull-chat", middleware.auth, UserController.pullChat)
router.post("/user-push-chat", middleware.auth, UserController.pushChat)
router.post("/user-search", middleware.auth, UserController.search)

export default router