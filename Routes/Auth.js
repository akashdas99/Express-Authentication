const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validation_schema");

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const isRegistered = await User.findOne({ email: result.email });
    if (isRegistered)
      throw createError.Conflict(`${result.email} already registered`);

    const user = await User.create(result);
    res.send(user);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  res.send("Login route");
});
router.post("/refresh-token", async (req, res, next) => {
  res.send("Refresh route");
});
router.delete("/logout", async (req, res, next) => {
  res.send("Logout route");
});
module.exports = router;
