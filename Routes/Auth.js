const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validation_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const isRegistered = await User.findOne({ email: result.email });
    if (isRegistered)
      throw createError.Conflict(`${result.email} already registered`);

    const user = await User.create(result);

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not Registered");
    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch) throw createError.Unauthorized("username/password not valid");
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Username/Password"));
    next(error);
  }
});
router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken, refToken });
  } catch (error) {
    return next(error);
  }
});
router.delete("/logout", async (req, res, next) => {
  res.send("Logout route");
});
module.exports = router;
