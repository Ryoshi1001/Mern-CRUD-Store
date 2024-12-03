import { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
  const {name, email, password} = req.body; 

  try {
    //make checks for validation, no email, name, or password
  if(!email || !password || !name){
    throw new Error("All fields are required")
  }

  //validation check if user exists
  const userAlreadyExists = await User.findOne({
    email: email
  })

  if(userAlreadyExists){
    throw new Error("User already exists")
  }

  //check for password hashpassword
  const hashedPassword = await bcryptjs.hash(password, 10); 
  const verificationToken = Math.floor(100000 + Math.random() * 900000);  
  console.log(verificationToken)

  const user = new User({
    email, 
    password, hashedPassword, 
    name, 
    verificationToken, 
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // hours 24
  })

  //save user to mongodb
  await user.save()


  if(password.length < 4){
    throw new Error("Password must be longer than 4 characters")
  }




  } catch (error) {
    
  }
}
export const login = (req, res) => {
  res.send("coins login")
}
export const logout = (req, res) => {
  res.send("coins logout")
}