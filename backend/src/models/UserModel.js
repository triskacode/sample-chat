import mongoose from "mongoose"

const { String, ObjectId, Number, Date, Boolean } = mongoose.Schema.Types

export const MessageType = {
    send: "send",
    receive: "receive"
}

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    socketId: String,
    loginState: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: mongoose.now()
    },
    chats: [{
        user: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        notifications: {
            type: Number,
            default: 0
        },
        messages: [{
            type: {
                type: String,
                enum: MessageType,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true,
                default: mongoose.now()
            }
        }]
    }]
}, { timestamps: true })

export const UserModel = mongoose.model("User", UserSchema)