const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw createError.BadRequest();

    const isRegistered = await User.findOne({ email: email });
    if (isRegistered) throw createError.Conflict();

    const user = await User.create({ email: email, password: password });
    // const saveUser = await user.save();
    res.send(user);
  } catch (error) {
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
