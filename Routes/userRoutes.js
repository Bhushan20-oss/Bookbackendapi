const express = require("express");
const {registerUser,loginUser}= require('../controllers/userController');

const router= express.Router();

const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: {
    success: false,
    message: "Too many login attempts, try again later",
  },
});

router.post('/register', registerUser);
router.post("/login", loginLimiter, loginUser);

module.exports = router;