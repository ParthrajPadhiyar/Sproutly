const User = require("../models/user.js");
const crypto = require('crypto');
const nodemailer = require("nodemailer");
require("dotenv").config();
const bcrypt = require('bcrypt');

module.exports.renderSignupForm = (req, res) => {
    if(!res.locals.currUser){
        return res.render("users/signup.ejs");
    } else {
        req.flash("success", "You are already LoggedIn");
        res.redirect("/");
    }
};

module.exports.signupUser = async (req, res) => {
    try {
        let { username, email, mobile, password } = req.body;
        const newUser = new User({
            email,
            username,
            mobile,
        });

        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Sproutly!");
            res.redirect("/");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    if(!res.locals.currUser){
        return res.render("users/login.ejs");
    } else {
        req.flash("success", "You are already LoggedIn");
        res.redirect("/");
    }
    //res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
    req.flash("success", "welcome back to Sproutly!");

    let redirectUrl = res.locals.redirectUrl || "/";
    //console.log(redirectUrl);
    res.redirect(redirectUrl);
};


module.exports.logoutUser = (req,res) => {
    req.logout((err) => { 
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/");
    })  
};

module.exports.renderForgotPasswordForm = (req,res) => {
    res.render("users/forgotPassword.ejs");
}

module.exports.sendMail = async (req,res) => {
    const { email } = req.body;
    //console.log(email);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect(req.headers.referer);
    }

    // 2. Generate a random reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //console.log(resetToken);
    user.resetPasswordToken = resetToken;
    //console.log(user.resetPasswordToken);
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    // 3. Save user with reset token and expiration
    await user.save();

    // 4. Configure email sending (replace with your actual email configuration)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com', // Use Gmail service
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail address
          pass: process.env.EMAIL_PASS, // Replace with the generated app password
        }
      });

    const mailOptions = { 
      from: {
        name: 'Sproutly',
        address: process.env.EMAIL_USER,
      } ,
      to: email,
      subject: 'Sproutly Password Reset',
      text: `You requested a password reset for your Sproutly account. Please click on the following link to reset your password: http://localhost:8080/reset-password/${resetToken}`
    };

    // 5. Send reset email
    transporter.sendMail(mailOptions);
    req.flash("success", "Password reset link sent to your email");
    //res.status(200).json({ message: 'Password reset link sent to your email' });
    res.redirect("/forgot-password");

  } catch (error) {
    //console.error(error);
    req.flash("error", "Failed to send password reset email");
    //res.status(500).json({ message: 'Failed to send password reset email' });
    res.redirect("/forgot-password");
  }

};


module.exports.renderResetPasswordForm = (req,res) => {
  const { token } = req.params;
  //console.log(req.params);
  res.render("users/resetPassword.ejs", {token});
}

module.exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    //console.log(req.params);
    const { newPassword, confirmPassword } = req.body;
  
    if (newPassword !== confirmPassword) {
        req.flash("error", "Passwords do not match");
      //return res.status(400).json({ message: 'Passwords do not match' });
      return res.redirect(`/reset-password/${token}`);
    }
  
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
          });
        
          //console.log(user);
          //let {username, email,address,} = user;

          if (!user) {
            req.flash("error", "Invalid or expired reset token");
            return res.redirect(`/reset-password/${token}`);
            //return res.status(400).json({ message: 'Invalid or expired reset token' });
          }
        
          user.setPassword(newPassword, async (err) => {
            if (err) {
                req.flash("error", "Failed to set new password");
                return res.redirect(`/reset-password/${token}`);
                //return res.status(500).json({ message: 'Failed to set new password' });
            }
        
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            req.flash("success", "Password reset successfully")
            res.redirect("/login")
            //res.status(200).json({ message: 'Password reset successfully' });
          });
          /* User.register(username,email,address,newPassword);
          user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save(); */
          //const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
          //user.password = hashedPassword;
          /* console.log(newPassword);
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          console.log(hashedPassword);
          user.password = hashedPassword; // Set the hashed password on the user object
          console.log(user.password);
          await user.setPassword(newPassword);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          await user.save();

          req.flash("success", "Password reset successfully");
          res.redirect("/login"); */
        
        } catch (error) {
          console.error(error);
          req.flash("error", "Failed to reset password");
          res.redirect(`/reset-password/${token}`);
          //res.status(500).json({ message: 'Failed to reset password' });
        }
        };