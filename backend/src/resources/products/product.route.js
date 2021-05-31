const { Router } = require("express");
const router = Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
} = require("./product.controller");

/**
 * @route       POST /product
 * @description Register route
 * @access      Private
 */
router.route("/product/add").post(addProduct);
/**
 * @route       POST /product/update/:id
 * @description Update route
 * @access      Private
 */
router.route("/product/update/:id").post(updateProduct);

/**
 * @route       GET /product
 * @description Register route
 * @access      Private
 */
router.route("/product").get(getAllProducts);

module.exports = router;
