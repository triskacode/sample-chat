import connectMongo from "connect-mongo"
import cors from "cors"
import express from "express"
import session from "express-session"
import http from "http"
import path from "path"
import { Config, Mongo, Passport } from "./config/index.js"
import { middleware } from "./middleware/index.js"
import router from "./router.js"
import { socketio } from "./socket.io/index.js"
import { ErrorHandler } from "./utils/index.js"

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const sessionConnectMongo = connectMongo(session)
const sessionConfig = {
    secret: Config.session.secretKey,
    resave: false,
    saveUninitialized: false,
    store: new sessionConnectMongo({ mongooseConnection: Mongo }),
    unset: 'destroy'
}

app.use(cors())
app.use(express.json())
app.use(session(sessionConfig))
app.use(express.static("../frontend/build/"))
app.use(Passport.initialize())
app.use(Passport.session())

app.use("/api", router, (req, res) => {
    throw ErrorHandler(404, "Page Not Found", "Request page not found.")
})

app.get('/auth/google', middleware.guest,
    Passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }));

app.get('/auth/google/callback',
    Passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }));

app.get("/auth/logout", middleware.auth, (req, res) => {
    const socketId = req.session.socketId

    if (socketId && io.of('/').sockets.has(socketId)) {
        io.of('/').sockets.get(socketId).disconnect(true)
    }
    
    console.log("logout")
    
    req.session.destroy()
    req.logout()
    res.redirect("/")
})

app.get("/*", (req, res) => res.sendFile(path.resolve("../frontend/build/index.html")))

app.use((error, req, res, next) => {
    console.log(error)
    let errorBody;

    if (error.code) {
        if (error.code === 440) {
            req.logout()
        }

        errorBody = error
    }
    else {
        errorBody = ErrorHandler(500, "Internal Server Error", "Something went wrong, please try again later.")
    }

    res.status(errorBody.code).json(errorBody)
})

server.listen(Config.port, Config.host, () => console.log('server running...'))