const Product = require("./product.model");
const createError = require("http-errors");

const addProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    const findProduct = await Product.findOne({ name: newProduct.name })
      .lean()
      .exec();
    if (findProduct) throw createError.BadRequest("The Product already exist!");

    await Product(newProduct).save();
    res.status(200).json({
      success: true,
      notification: "Product created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const foundedProduct = await Product.findById(req.params.id).lean().exec();
    if (!foundedProduct) throw createError.NotFound("Product not found");
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    res.status(201).json({
      success: true,
      data: updateProduct,
      notification: "Product updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find().lean().exec();
    res.status(200).json({ data: allProducts });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
};
