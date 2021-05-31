const { Router } = require("express");
const router = Router();
const {
  login,
  logout,
  registerUser,
  refreshToken,
} = require("./user.controller");

/**
 * @route       POST /user
 * @description Register route
 * @access      Public
 */
router.route("/user/register").post(registerUser);
/**
 * @route       POST /user/login
 * @description Login route
 * @access      Private
 */
router.route("/user/login").post(login);

/**
 * @route       POST /user/refresh-token
 * @description refresh Token route
 * @access      Private
 */
router.route("/user/refresh-token").post(refreshToken);

/**
 * @route       POST /user/logout
 * @description Logout route
 * @access      Private
 */
router.route("/user/logout").delete(logout);

module.exports = router;
