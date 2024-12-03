import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { connectDB } from './config/db.js'
dotenv.config()

import productRoutes from './routes/product.route.js'
import authRoutes from './routes/auth.route.js'

//create express server
const app = express()
app.use(express.json())
app.use(cors())

//ENV
const PORT = process.env.PORT || 3000;  

const __dirname = path.resolve(); 

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes); 

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



