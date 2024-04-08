const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const url = 'mongodb://localhost/crud'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})

const conn = mongoose.connection

conn.on('open', () =>{
    console.log("Connected...")
})

app.use(express.json())

const Router = require('./routes/user')
app.use('/user', Router)
app.use(cors())

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})


app.listen(3000, ()=>{
    console.log("Server Started")
})