const express = require("express");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  res.send("Register route");
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
