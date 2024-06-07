const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/user.js");


router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signupUser));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl ,passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.loginUser);

// logout
router.get("/logout", userController.logoutUser);

router.route("/forgot-password")
.get(userController.renderForgotPasswordForm)
.post(userController.sendMail);

router.route("/reset-password/:token")
.get(userController.renderResetPasswordForm)
.post(userController.resetPassword);

module.exports = router;





