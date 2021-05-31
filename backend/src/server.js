const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const port = require("./config/key_dev").PORT;
const connectDB = require("./utils/db");
const { verifyAccessToken } = require("./utils/jwt_helper");

//Import Router
const UserRoute = require("./resources/users/user.route");
const ProductRoute = require("./resources/products/product.route");

// Create express App
const app = express();

//Logger middleware for node.js
app.use(morgan("dev"));
app.use(cors());

//parse application/json
app.use(express.json());

//API Routers
app.get("/", verifyAccessToken, async (req, res, next) => {
  res.send("Hello from Express");
});
app.use("/", UserRoute);
app.use("/", ProductRoute);

//Handel Error
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

/**
 * Function to start server and connection to mongoDB
 */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(8585, console.log(`🚀 Server start on port ${port}...`));
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = startServer;
