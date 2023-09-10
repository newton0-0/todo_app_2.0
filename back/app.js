require('dotenv').config()

//middlewares
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const routesUnited = require('./routes/routesUnited')

//response
app.use(express.json())

//routes
app.use('/', routesUnited)

//db connection
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT,() => {
            console.log('Database connected, listening to port : ', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })