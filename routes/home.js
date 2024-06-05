const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Item = require("../models/item.js");

const {isLoggedIn, isOwner,validateReview, isReviewAuthor} = require("../middleware.js");


const homeController = require("../controllers/home.js");

const multer = require("multer");


const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); 

router.route("/")
.get(wrapAsync(homeController.home))

// serach route
router.route("/search")
.get(wrapAsync(homeController.searchItem));

router.route("/review")
.post(validateReview,wrapAsync(homeController.giveHomeReview));

router.delete("/review/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(homeController.destroyHomeReview));

router.route("/about")
.get(wrapAsync(homeController.renderAbout));

router.route("/help")
.get(wrapAsync(homeController.renderHelp));

router.route("/contact")
.get(homeController.renderContact)
.post(isLoggedIn,homeController.contactMessage);

module.exports = router;


