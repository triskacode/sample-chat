import { User } from "../utils/index.js"
import _ from "lodash"

export const UserController = {
    async detail(req, res, next) {
        try {
            const user = await (async () => {
                if (req.user) {
                    return await req.user.populate("chats.user", "-chats").execPopulate()
                }

                return {}
            })()

            const userDetail = {
                isAuthenticated: req.isAuthenticated(),
                user: user
            }

            res.json({ code: 200, data: userDetail })
        } catch (error) {
            console.log("from UserController.detail")
            next(error)
        }
    },
    async detailLogin(req, res, next) {
        const { _id } = req.body

        try {
            const user = await User.findId(_id, "-chats")
            let loginState

            if(user.loginState === true){
                loginState = "Online"
            }else {
                const lastLogin = new Date(user.lastLogin)
                const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum\'at", "Sabtu"]
                loginState = days[lastLogin.getDay()]+ ", " + lastLogin.toLocaleString().replaceAll(".", ":")
            }

            res.json({ code: 200, data: loginState })
        } catch (error) {
            console.log("from UserController.detailLogin")
            next(error)
        }
    },
    async find(req, res, next) {
        const { _id } = req.body

        try {
            const user = await User.findId(_id, "-chats")

            res.json({ code: 200, data: user })
        } catch (error) {
            console.log("from UserController.find")
            next(error)
        }
    },
    async search(req, res, next) {
        const { email } = req.body

        try {
            if (!_.isString(email) || email === "") {
                res.json({ code: 200, data: [] })
            } else {
                const users = await User.search({ email: new RegExp(email), _id: { $ne: req.user._id } })

                res.json({ code: 200, data: users })
            }
        } catch (error) {
            console.log("from UserController.search")
            next(error)
        }
    },
    async pushChat(req, res, next) {
        const { _id: receiverId } = req.body

        try {
            const sender = req.user
            const receiver = await User.find({ _id: receiverId })

            if (!_.find(sender.chats, { user: receiver._id })) {
                await User.pushChat(sender, receiver)
            }

            const response = await sender.populate("chats.user", "-chats").execPopulate()
            res.json({ code: 200, data: response })
        } catch (error) {
            console.log("from UserController.pushChat")
            next(error)
        }
    },
    async pullChat(req, res, next) {
        const { _id: receiverId } = req.body

        try {
            const sender = req.user
            const receiver = await User.find({ _id: receiverId })

            if (_.find(sender.chats, { user: receiver._id })) {
                await User.pullChat(sender, receiver)
            }

            const response = await sender.populate("chats.user", "-chats").execPopulate()
            res.json({ code: 200, data: response })
        } catch (error) {
            console.log("from UserController.pullChat")
            next(error)
        }
    },
    async clearMessage(req, res, next) {
        const { _id: receiverId } = req.body

        try {
            const sender = req.user
            const receiver = await User.find({ _id: receiverId })

            if (_.find(sender.chats, { user: receiver._id })) {
                await User.clearMessage(sender, receiver)
            }

            const response = await sender.populate("chats.user", "-chats").execPopulate()
            res.json({ code: 200, data: response })
        } catch (error) {
            console.log("from UserController.clearMessage")
            next(error)
        }
    },
}