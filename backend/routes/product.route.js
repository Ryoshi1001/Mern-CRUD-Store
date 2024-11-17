import express from 'express';
import { createProducts, deleteProducts, getProducts, updateProducts } from '../controllers/product.controller.js';

const router = express.Router();

//use router instead of app.get, app.post. app.delete, app.put
// router.get();
// router.post();
// router.delete();
// router.put();

router.get('/', getProducts);

//to make a product or todo or anything use POST method
router.post('/', createProducts);

router.put('/:id', updateProducts);

router.delete('/:id', deleteProducts);

export default router;
