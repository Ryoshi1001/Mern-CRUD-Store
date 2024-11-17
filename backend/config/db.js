import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB); 
    console.log(`CONNECTED TO MONGODB: ${conn.connection.host}`)
  } catch (error) {
    console.log(`ERROR CONNECTING TO MONGODB: ${error.message}`)
    process.exit(1); // 1 means a error , 0 means success connection
  }
}