require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouters");
const productRouter = require("./routes/productRouters");
const finalProductRouter = require("./routes/FinalProductRoute");

const imageRouter = require("./routes/imageRouters");
const connectDB = require("./db/connectDB");
const ScrapRoute = require("./routes/ScrapRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.set("view engine", "ejs");

const port = 8000;

connectDB();

app.use(authRouter);
app.use(finalProductRouter);
app.use(productRouter);
app.use(imageRouter);
app.use(ScrapRoute);

app.listen(port, () => {
  console.log(`Connection is ${port}`);
});
