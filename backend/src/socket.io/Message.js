import { ErrorHandler, User } from "../utils/index.js"
import _ from "lodash"
import { MessageType } from "../models/UserModel.js"

export const Message = (io, socket) => {
    return async ({ to, content }, callback) => {
        try {
            const user = await User.findId(socket.request.user._id)
            const otherUser = await (async () => {
                const otherUser = await User.findId(to)
                if (!_.find(otherUser.chats, { user: user._id })) {
                    await User.pushChat(otherUser, user)
                }

                return otherUser
            })()

            const userChatIndex = _.findIndex(user.chats, { user: otherUser._id })
            const otherUserChatIndex = _.findIndex(otherUser.chats, { user: user._id })

            user.chats[userChatIndex].messages.push({
                type: MessageType.send,
                content
            })
            await user.save()
            otherUser.chats[otherUserChatIndex].messages.push({
                type: MessageType.receive,
                content
            })
            await otherUser.save()

            await user.populate("chats.user", "-chats").execPopulate()
            await otherUser.populate("chats.user", "-chats").execPopulate()

            socket.emit("message", user)
            if (!_.isEmpty(otherUser?.socketId)) {
                io.to(otherUser.socketId).emit("message", otherUser)
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