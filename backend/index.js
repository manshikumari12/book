const express =require('express')
require("dotenv").config()
const {connection}=require('./db')
const {bookrouter} = require("./route/book.route")
const app =express()
app.use(express.json())



app.use("/",bookrouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to data-base")
        
    } catch (error) {
      
        console.log(error)  
    }

    console.log(`server is running at port ${process.env.port}`)
})

