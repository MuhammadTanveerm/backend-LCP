
const express = require('express')
const app = express()

const cors = require ('cors')
const cookieparser = require(`cookie-parser`)


app.use(cors( {
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({  limit: "16kb" }))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(cookieparser())

// Router 
const userRouter = require ('./routes/user.routes.js')
app.use('/api/v1/users', userRouter)

module.exports = app