const createError = require("http-errors");
const User = require("./user.model");
const userValidation = require("./user.validation");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../utils/jwt_helper");
const registerUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const findUser = await User.findOne({ email: newUser.email }).lean().exec();

    if (findUser) throw createError.NotFound("The User already exist");

    const { errors, isValid } = await userValidation(newUser);

    if (!isValid) throw createError.NotFound(errors);

    const user = await User(newUser).save();

    res.status(200).json({
      success: true,
      user,
      notification: "User created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = req.body;
    //Verify email end password
    const { errors, isValid } = await userValidation(result);
    if (!isValid) throw createError.NotFound(errors);

    //Check if the user exist or note
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("Username/password not valid");

    const accessToken = await signAccessToken(user._id.toString());
    const refreshToken = await signRefreshToken(user._id.toString());
    console.log("refreshToken", refreshToken);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    return next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    client.DEL(userId, (err, val) => {
      if (err) {
        console.log(err.message);
        throw createError.InternalServerError();
      }
      res.sendStatus(204);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, login, refreshToken, logout };
