import { ErrorHandler } from "./index.js"
import { UserModel } from "../models/UserModel.js"

export const User = {
    async store({ googleId, email, name, photo }) {
        try {
            const user = await UserModel.create({ googleId, email, name, photo })

            return user
        } catch (error) {
            console.error("Cannot store new user", { googleId, email, name, photo })
            throw ErrorHandler(500, "Internal Server Error", "Cannot store user.")
        }
    },
    async findId(_id, select = "") {
        try {
            const user = await UserModel.findById(_id, select)

            return user
        } catch (error) {
            console.error("Cannot find user", _id)
            throw ErrorHandler(400, "Bad Request", "Cannot find user.")
        }
    },
    async find(query, strict = true, select = "") {
        try {
            const user = await UserModel.findOne(query, select)

            if (strict === true) {
                if (!user) {
                    console.error("Cannot find user", query)
                    throw ErrorHandler(400, "Bad Request", "Cannot find user.")
                }
            }

            return user
        } catch (error) {
            console.log(error.message)
            if (error.code) {
                throw error
            } else {
                console.error("Cannot find user", query)
                throw ErrorHandler(500, "Internal Server Error", "Cannot find user.")
            }
        }
    },
    async search(query) {
        try {
            const user = await UserModel.find(query, "-chats").exec()

            return user
        } catch (error) {
            console.error("Cannot search user", query)
            throw ErrorHandler(500, "Internal Server Error", "Cannot search user.")
        }
    },
    async pushChat(sender, receiver) {
        try {
            sender.chats.push({ user: receiver._id })
            await sender.save()
            receiver.chats.push({ user: sender._id })
            await receiver.save()
        } catch (error) {
            console.error("Cannot push chat", sender, receiver)
            throw ErrorHandler(500, "Internal Server Error", "Cannot push chat.")
        }
    }
} 