import { ErrorHandler } from "../utils/index.js"

export const middleware = {
    auth(req, res, next) {
        if (req.isAuthenticated() === true) {
            return next()
        } else {
            throw ErrorHandler(401, "Unauthorize", "Please Login before access this page.")
        }
    },
    guest(req, res, next) {
        if (req.isAuthenticated() === false) {
            return next()
        } else {
            throw ErrorHandler(401, "Unauthorize", "Please Logout before access this page.")
        }
    },
}