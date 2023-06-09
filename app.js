const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
const AuthRoute = require("./Routes/Auth");
const app = express();

app.get("/", async (req, res, next) => {
  res.send("Hello from Express");
});

app.use("/auth", AuthRoute);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
