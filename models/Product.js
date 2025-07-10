import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  discount: Number,
  image: String,
  inStock: { type: Boolean, default: true }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
