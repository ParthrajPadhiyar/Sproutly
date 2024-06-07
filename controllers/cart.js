const Item = require("../models/item.js");
const Address = require("../models/address.js")
const User = require("../models/user.js");
const Cart = require('../models/cart');


module.exports.addToCart = async (req, res) => {
  const { id } = req.body;

  try {
    const itemToAdd = await Item.findById(id);
    if (!itemToAdd) {
      req.flash("error", "Item you requested does not exist!");
      return res.redirect(req.headers.referer);
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ item: itemToAdd._id, quantity: 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(cartItem => cartItem.item.toString() === id);
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ item: itemToAdd._id, quantity: 1 });
      }
    }

    await cart.save();
    req.flash("success", "Item added to your cart");
    res.redirect(req.headers.referer);

  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to add item to cart");
    res.redirect(req.headers.referer);
  }
};

module.exports.renderCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
    const totalPrice = cart ? cart.items.reduce((total, item) => total + (item.item.price * item.quantity), 0) : 0;
    res.render("carts/cart.ejs", { cart: cart ? cart.items : [], totalPrice });
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to load cart");
    res.redirect('/');
  }
};

module.exports.removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(item => item.item.toString() !== id);
      await cart.save();
      req.flash("success", "Item removed from the Cart");
    } else {
      req.flash("error", "Cart not found");
    }
    res.redirect("/cart");

  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to remove item from cart");
    res.redirect("/cart");
  }
};

module.exports.updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.item.toString() === id);
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        req.flash("success", "Quantity updated");
      } else {
        req.flash("error", "Requested item doesn't exist");
      }
    } else {
      req.flash("error", "Cart not found");
    }
    res.redirect("/cart");

  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to update cart");
    res.redirect("/cart");
  }
};


module.exports.destroyCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    req.flash("success", "All Items removed from the Cart");
    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to clear cart");
    res.redirect("/cart");
  }
};


module.exports.renderCheckoutForm = async (req, res) => {
  const user = await User.findById(req.user._id).populate("address");
  const addressLength = user.address.length;
  res.render("carts/checkout.ejs", { user, addressLength });
};

module.exports.createAddress = async (req, res) => {
  const user = await User.findById(req.user._id);
  const newAddress = new Address(req.body.address);
  newAddress.user = req.user._id;
  user.address.push(newAddress);
  await newAddress.save();
  await user.save();
  req.flash("success", "New Address Added");
  res.redirect("/cart/checkout");
};

module.exports.renderOrderSummaryPage = async (req, res) => {
  const user = await User.findById(req.user._id);
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
  if (!cart) {
    return res.render("carts/orderSummary.ejs", { cart: [], totalPrice: 0, user });
  }

  const totalPrice = cart.items.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  res.render("carts/orderSummary.ejs", { cart: cart.items, totalPrice, user });
};

module.exports.renderOrderSummaryPageWithAddress = async (req, res) => {
  const { addressId } = req.body;
  const address = await Address.findById(addressId);
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
  if (!cart) {
    return res.render("carts/orderSummary.ejs", { cart: [], totalPrice: 0, address });
  }

  const totalPrice = cart.items.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  res.render("carts/orderSummary.ejs", { cart: cart.items, totalPrice, address });
};













