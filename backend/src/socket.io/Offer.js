import { ErrorHandler, User } from "../utils/index.js"
import _ from "lodash"

export const Offer = (io, socket) => {
    return async ({ to }, callback) => {
        try {
            const user = await User.findId(socket.request.user._id)
            const otherUser = await User.findId(to)
            console.log("offer")

            if (otherUser.loginState === true) {
                console.log("login")
                if (!_.isEmpty(otherUser?.socketId)) {
                    io.to(otherUser.socketId).emit("offer", { from: user })
                }
            } else {
                console.log("offline")
                socket.emit("reject", { message: "Target user is offline." })
            }
        } catch (error) {
            console.log(error)
            if (error.code) {
                callback(error)
            } else {
                callback(ErrorHandler(500, "Internal Server Error", "Cannot initialize socket.io session."))
            }
        }
    }
}