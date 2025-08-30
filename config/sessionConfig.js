import session from "express-session";
import MongoStore from 'connect-mongo'
import 'dotenv'
dotenv.config()

export const sessionConfig = session({
    secret:process.env.SESSION_SECRET,
    store: MongoStore.create({mongoUrl: process.env.DB_ACESS}),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*60*24,
        httpOnly:true
    }
})