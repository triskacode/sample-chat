import { ErrorHandler, User } from "../utils/index.js"
import _ from "lodash"
import { MessageType } from "../models/UserModel.js"

export const IoRouter = (io) => (socket) => {
    socket.on("init", async (callback) => {
        const user = await socket.request?.user

        try {
            user.socketId = socket.id
            await user.save()
        } catch (error) {
            callback(ErrorHandler(500, "Internal Server Error", "Cannot initialize socket.io session."))
        }
        
        console.log(user)
        console.log(`new socket.io connection: ${user.email}`)

        socket.emit("connection established", user)
    })

    socket.on("message", async ({ to, content }, callback) => {
        try {
            const sender = await User.findId(socket.request.user._id)
            const receiver = await User.findId(to)
            const senderChatIndex = _.findIndex(sender.chats, (chat) => _.toString(chat.user) === _.toString(to))
            const receiverChatIndex = _.findIndex(receiver.chats, (chat) => _.toString(chat.user) === _.toString(sender._id))

            sender.chats[senderChatIndex].messages.push({
                type: MessageType.send,
                content
            })
            await sender.save()
            receiver.chats[receiverChatIndex].messages.push({
                type: MessageType.receive,
                content
            })
            await receiver.save()

            await sender.populate("chats.user", "-chats").execPopulate()
            await receiver.populate("chats.user", "-chats").execPopulate()

            socket.emit("message", sender)
            if (!_.isEmpty(receiver?.socketId)) {
                io.to(receiver.socketId).emit("message", receiver)
            }
        } catch (error) {
            console.log(error)
            if (error.code) {
                callback(error)
            } else {
                callback(ErrorHandler(500, "Internal Server Error", "Cannot initialize socket.io session."))
            }
        }
    })

    socket.on("disconnecting", async () => {
        const user = await socket.request.user

        try {
            user.socketId = ""
            await user.save()
        } catch (error) {
            console.log(ErrorHandler(500, "Internal Server Error", "Cannot destroy socket.io session."), socket.request.user)
        }
        console.log(user)

        console.log(`disconnect socket.io connection: ${user.email}`)
    })

    socket.on("error", (error) => {
        console.log(error)
    })
}