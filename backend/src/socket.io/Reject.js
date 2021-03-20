import { ErrorHandler, User } from "../utils/index.js"
import _ from "lodash"

export const Reject = (io, socket) => {
    return async ({ to, message }, callback) => {
        try {
            const otherUser = await User.findId(to)

            if (otherUser.loginState === true) {
                if (!_.isEmpty(otherUser?.socketId)) {
                    io.to(otherUser.socketId).emit("reject", { message })
                }
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