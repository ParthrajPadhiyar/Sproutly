const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Item = require("../models/item.js");

const {isLoggedIn, isOwner,validateItem} = require("../middleware.js");


const wishlistController = require("../controllers/wishlist.js");



router.route("/wishlist")
.get(isLoggedIn, wrapAsync(wishlistController.renderWishlist))
.post(isLoggedIn, wrapAsync(wishlistController.createWishlist ))
.delete(isLoggedIn, (wishlistController.destroyWishlist));

router.route("/wishlist/:id")
.delete(isLoggedIn, (wishlistController.destroyWishlistItem))









module.exports = router;