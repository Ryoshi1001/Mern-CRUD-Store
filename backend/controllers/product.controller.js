import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(302).json({ success: true, data: products });
  } catch (error) {
    console.log('Error Loading All Products', error.message);
    return res
      .status(400)
      .json({ success: false, message: 'Error Loading All Products', error });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body; //user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' });
  }

  //if it passes check and has all 3 things for product in schema now can create a new Product : import the model and pass product as argument which is information from req.body
  const newProduct = new Product(product);

  //try to add to db await newProduct and  use .save() return responses for success and failure to DB
  try {
    await newProduct.save();
    console.log('New Product Added');
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating new Product', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateProducts = async (req, res) => {
  //get id from request params like delete method
  const { id } = req.params;

  //name , price, image, user info needed to update
  const product = req.body;

  //if user puts a id that is not in database good to use conditional here before updating product
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Error Updating Product', error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Server Error', error });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  
  //if user puts a id that is not in database good to use conditional here before updating product
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    await Product.findByIdAndDelete(id);
    console.log('Product Deleted');
    return res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Error Deleting Product', error.message);
    return res.status(500).json({ success: false, message: 'Sever Error' });
  }
};
