const express = require("express");
const passport = require("passport");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const {
  logout_post,
  signup_get,
  signup_post,
  login_get,
  login_succes,
  login_post,
  google_get,
  google_callback,
} = require("../controllers/authController");

router.get("/login", login_get);
router.get("/register", signup_get);
router.post("/login", login_post);
router.get("/login/success", login_succes);
router.post("/register", signup_post);
router.get("/logout", logout_post);
router.get("/google", google_get);
router.get("/google/callback", google_callback);
module.exports = router;
