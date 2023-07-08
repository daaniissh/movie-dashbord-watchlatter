const express = require("express");
const { checkAuth } = require("../middleware/checkauth");
const {
  login,
  signup,
  AllWatchLatter,
  addWatchLatter,
} = require("../controllers/userController");
const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.get("/watchlatter", checkAuth, AllWatchLatter);
router.post("/addWatchLater", checkAuth, addWatchLatter);
// router.get("/logout", logout);

module.exports = router;
