import mongoose from 'mongoose'; 

const productSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
  }, 
  price: {
    type: Number, 
    required: true, 
  }, 
  image: {
    type: String, 
    required: true, 
  }
}, {
  timestamps: true // optional but good has createdAt, updatedAt data
})

//after making schema make model telling mongoose to make Collection named "Product" and use the productSchema fields in mongoDB. 

const Product = mongoose.model("Product", productSchema); 
//mongoose will turn "Product" into "products" collection in MongoDB

export default Product; 