const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const { signUp } = require("../controllers/users.js");

const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignupform);

// SignUp
router.post ("/signup", wrapAsync(userController.signUp));

// LogIn
router.get("/login", userController.renderLoginform);

router.post("/login", 
    saveRedirectUrl, 
    passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

// LogOut
router.get("/logout", userController.logout);

module.exports = router;
