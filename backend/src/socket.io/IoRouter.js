import { Offer } from "./Offer.js"
import { Init } from "./Init.js"
import { Message } from "./Message.js"
import { Answer } from "./Answer.js"
import { Reject } from "./Reject.js"
import { Constraints } from "./Constraints.js"
import { Signal } from "./Signal.js"
import { Disconnecting } from "./Disconnecting.js"
import { CloseRTC } from "./CloseRTC.js"

export const IoRouter = (io) => (socket) => {
    console.log("new connection: " + socket.id)

    socket.on("init", Init(io, socket))
    socket.on("message", Message(io, socket))
    socket.on("offer", Offer(io, socket))
    socket.on("answer", Answer(io, socket))
    socket.on("reject", Reject(io, socket))
    socket.on("close rtc", CloseRTC(io, socket))
    socket.on("constraints", Constraints(io, socket))
    socket.on("signal", Signal(io, socket))
    socket.on("disconnecting", Disconnecting(io, socket))

    socket.on("error", (error) => {
        console.log(error)
    })
}