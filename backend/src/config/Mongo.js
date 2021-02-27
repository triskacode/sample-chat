import mongoose from "mongoose"
import { Config } from "./Config.js";

mongoose
    .connect(Config.mongoUri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("database connected..."))
    .catch((err) => {
        console.error(err)
        throw new Error("Cannot connect with database.")
    });

export const Mongo = mongoose.connection