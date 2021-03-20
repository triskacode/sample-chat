import { ErrorHandler } from "../utils/index.js"
import mongoose from "mongoose"

export const Disconnecting = (io,socket) => {
    return async () => {
        const user = await socket.request.user

        try {
            user.socketId = ""
            user.loginState = false
            user.lastLogin = mongoose.now()
            await user.save()
            console.log(user)
        } catch (error) {
            console.log(ErrorHandler(500, "Internal Server Error", "Cannot destroy socket.io session."), socket.request.user)
        }

        console.log(`disconnect socket.io connection: ${user.email}`)
    }
}