import { ErrorHandler } from "../utils/index.js"
import mongoose from "mongoose"

export const Init = (io, socket) => {
    return async (callback) => {
        const user = await socket.request.user.populate("chats.user", "-chats").execPopulate()

        try {
            user.socketId = socket.id
            user.loginState = true
            user.lastLogin = mongoose.now()
            await user.save()
        } catch (error) {
            callback(ErrorHandler(500, "Internal Server Error", "Cannot initialize socket.io session."))
        }

        console.log(`new socket.io connection: ${user.email}`)

        socket.emit("connection established", user)
    }
}