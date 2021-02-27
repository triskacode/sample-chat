import dotenv from "dotenv"

dotenv.config()

export const Config = {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 3000,
    appUrl: process.env.APP_URL || "",
    mongoUri: (() => {
        if (process.env.MONGO_URI) {
            return process.env.MONGO_URI
        }
        else {
            console.error("cannot read mongo uri from environment.")
            throw new Error("Please set mongo uri in environment.")
        }
    })(),
    session: {
        secretKey: process.env.SESSION_SECRET_KEY || "chat-react"
    },
    google: (() => {
        if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_SECRET_ID) {
            return {
                clientId: process.env.GOOGLE_CLIENT_ID,
                secretId: process.env.GOOGLE_SECRET_ID
            }
        }
        else {
            console.error("cannot read google credentials from environment.")
            throw new Error("Please set google credentials in environment.")
        }
    })()
}