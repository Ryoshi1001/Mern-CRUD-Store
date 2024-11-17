import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { connectDB } from './config/db.js'
dotenv.config()

import productRoutes from './routes/product.route.js'

//create express server
const app = express()
app.use(express.json()) // important for url working with methods in postman and to make sure req.body works it is the MiddleWare: allows us to accept json data in the req.body
app.use(cors())

//ENV
const PORT = process.env.PORT || 3000;  

const __dirname = path.resolve(); 

app.use('/api/products', productRoutes)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  connectDB(); 
  console.log(`App listening on PORT: ${PORT}`)
})



