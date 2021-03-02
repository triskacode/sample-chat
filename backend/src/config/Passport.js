import Passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { Config } from "./Config.js"
import { ErrorHandler, User } from "../utils/index.js"

const config = {
    clientID: Config.google?.clientId,
    clientSecret: Config.google?.secretId,
    callbackURL: `${Config.appUrl}/auth/google/callback`,
    passReqToCallback: true
}

const callback = async function (request, accessToken, refreshToken, profile, done) {
    const { id: googleId, displayName: name, email, picture: photo } = profile

    try {
        const user = await User.find({ googleId }, false)

        if (user) {
            user.name = name
            user.photo = photo
            await user.save()
            
            return done(null, user)
        }
        else {
            const newUser = await User.store({ googleId, email, name, photo })

            return done(null, newUser)
        }
    } catch (error) {
        return done(error)
    }
}

Passport.serializeUser(function (user, done) {
    return done(null, user._id);
});

Passport.deserializeUser(async function (_id, done) {
    try {
        const user = await User.find({ _id }, false)

        if (user) {
            return done(null, user)
        }
        else {
            console.log("from Passport")
            return done(ErrorHandler(440, "Login Time-out", "The client's session has expired and must log in again."))
        }

    } catch (error) {
        console.log("from Passport")
        return done(error)
    }
});

Passport.use(new GoogleStrategy(config, callback))

export default Passport