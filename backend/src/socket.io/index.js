import { Server } from "socket.io"
import session from "express-session"
import connectMongo from "connect-mongo"
import { Config, Mongo, Passport } from "../config/index.js"
import { ErrorHandler } from "../utils/index.js"
import { IoRouter } from "./IoRouter.js"

export const socketio = (server) => {
    const io = new Server(server)
    const sessionConnectMongo = connectMongo(session)
    const sessionConfig = {
        secret: Config.session.secretKey,
        resave: false,
        saveUninitialized: false,
        store: new sessionConnectMongo({ mongooseConnection: Mongo }),
        unset: 'destroy'
    }

    const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next)
    io.use(wrap(session(sessionConfig)))
    io.use(wrap(Passport.initialize()))
    io.use(wrap(Passport.session()))
    io.use((socket, next) => {
        if (socket.request.isAuthenticated()) {
            next()
        } else {
            next(ErrorHandler(401, "Unauthorized", "Access denied, please login"))
        }
    })

    io.on("connection", IoRouter(io))

    return io
}