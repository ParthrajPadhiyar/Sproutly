const express = require("express");
const router = express.Router();
const {saveRedirectUrl} = require("../middleware.js");

const wrapAsync = require("../utils/wrapAsync.js");
const Item = require("../models/item.js");

const {isLoggedIn, isOwner,validateItem, validateAddress} = require("../middleware.js");


const cartController = require("../controllers/cart.js");



router.route("/cart")
.get(isLoggedIn, wrapAsync(cartController.renderCart))
.post(saveRedirectUrl, isLoggedIn, wrapAsync(cartController.addToCart ))
.delete(isLoggedIn, (cartController.destroyCart));

router.route("/cart/checkout")
.get(isLoggedIn, cartController.renderCheckoutForm)
.post(isLoggedIn,validateAddress,cartController.createAddress);

router.route("/cart/checkout/orders")
.get(isLoggedIn, cartController.renderOrderSummaryPage)
.post(isLoggedIn, cartController.renderOrderSummaryPageWithAddress);


router.route("/cart/:id")
.delete(isLoggedIn, (cartController.removeFromCart))
.put(isLoggedIn, cartController.updateCart);








module.exports = router;


