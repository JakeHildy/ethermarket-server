const express = require("express");
const cors = require("cors");
const listingRouter = require("./routes/listingRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const signupRouter = require("./routes/signupRoutes");
const loginRouter = require("./routes/loginRoutes");
const userRouter = require("./routes/userRoutes");
const cryptoRouter = require("./routes/cryptoRoutes");
const { getCryptoPrices } = require("./utils/getCryptoPrices");

const app = express();

///////////////////////////////////////////
// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

///////////////////////////////////////////
// ROUTES
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/signup", signupRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/crypto", cryptoRouter);

///////////////////////////////////////////
// DATA GENERATION
getCryptoPrices();

module.exports = app;
