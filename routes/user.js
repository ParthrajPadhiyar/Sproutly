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





// signup 
//router.get("/signup", userController.renderSignupForm);
//router.post("/signup", wrapAsync(userController.signupUser));

// login
//router.get("/login", userController.renderLoginForm);
//router.post("/login", saveRedirectUrl ,passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.loginUser);

// logout
//router.get("/logout", userController.logoutUser);

//module.exports = router;





// SignUp

/* router.get("/signup", (req, res) => {
    //res.send("form");
    res.render("users/signup.ejs");
}); */


/* router.post("/signup", wrapAsync(async (req, res) => {
    // ahi aapde try and catach atle use karie che km k jayre error aave che to aapde lost page ma jara rahiye che ane signup page nathi dekatu
    // jyare try thi karsu to aapde ene catch ma redirect karsu signup page per
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            email,
            username,
        });

        const registeredUser = await User.register(newUser, password);
        //console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

})); */



// Login

/* router.get("/login", (req, res) => {
    res.render("users/login.ejs");
}); */


/* router.post("/login", saveRedirectUrl ,passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async (req, res) => {
    // have authenticate that user is already registered or not 
    // this done by passport which is happen as a middleware which is passport.authenticate()
    //res.send("Welcome to WanderLust! You are logged in");
    req.flash("success", "welcome back to WanderLust");
    //res.redirect("/listings");
    //res.redirect(req.session.redirectUrl);
    // khali req.session.redirectUrl thi nai kam thay km k generally thay jay pan aapdne passport na lidhe error aavse km k 
    // jevo j user login karse to passport req.session ne reset kari dese atle aapde je information store karai hase e pan delete thai jase to aapde  aana solution mate req.session.redirectUrl ne locals ma store karsu jenathi passport req.session.redirectUrl ni value ne delete nai kare
    //res.redirect(res.locals.redirectUrl);
    // aa badhu karyu pan aapde direct login karye jm k listings vada page thi isloggedIn trigger j nai thay ane req.session.redirectUrl ma koi value j nai aave ane na to ae res.locals.redirectUrl ma store thase etle error aave ke page not found je undefined path che   
    // to ena mate aapde condition muksu

    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}); */






// LOG out

/* router.get("/logout", (req,res) => {
    req.logout((err) => { // it take callback  ena mate ke jm j user logout thase to pachi su kam thavu joie em
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })  
}); */
