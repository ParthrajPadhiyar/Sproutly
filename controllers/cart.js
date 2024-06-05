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














/* let cart = [];

module.exports.indexCart = async (req,res) => {
    let {id} = req.body;
    //console.log(id);
    const itemToAdd = await Item.findById(id);
    //console.log(itemToAdd);
    // Check if item already exists in cart (optional):
    const existingItemIndex = cart.findIndex(item => item.id === id);
    if(itemToAdd){
        if(existingItemIndex !== -1){
            cart[existingItemIndex].quantity++;
        } else {
            //console.log(itemToAdd);
            /* const newItem = {...itemToAdd};
            newItem.quantity = 1;
            //cart.push({...itemToAdd, quantity: 1}); in this line we use nested object so ..itemToAdd spread operator not work as we want
            //console.log(newItem); // The output you're seeing with properties like '$__' and '$isNew' is likely due to internal details added by Mongoose (a popular ODM for MongoDB in Node.js) when working with documents. These properties are not part of the actual data you want to store in the cart and should be filtered out before sending the cart information to the front-end
            cart.push(newItem); */

            /* const newItem = { ...itemToAdd };
            newItem.quantity = 1;

            // Filter out Mongoose internal properties (assuming you know their names)
            delete newItem['$__'];
            delete newItem['$isNew'];

            cart.push(newItem); *

            const newItem = itemToAdd.toObject({ virtuals: true }); // Include virtuals if needed
            newItem.quantity = 1;

            //console.log(newItem);

            cart.push(newItem);
        }
        req.flash("success", "Item added to your cart")
    } else {
        req.flash("error","Item you requested does not exist!");
    }
    /* let redirectUrl = res.locals.redirectUrl || "/";
    console.log(redirectUrl) *
    //res.redirect(req.originalUrl);
    const referer = req.headers.referer;
    //console.log(req.headers.referer);
    res.redirect(referer);
}

module.exports.renderCart = async (req,res) => {
    let totalPrice = await cart.reduce((total, item) => total + (item.price*item.quantity), 0);
    res.render("carts/cart.ejs", {cart, totalPrice});
}

module.exports.destroyCartItem =  (req,res) => {
    let {id} = req.params;
    cart =  cart.filter(item => item.id !== id);
    req.flash("success", "Item removed from the Cart");
    res.redirect("/cart");
}

module.exports.destroyCart =  (req,res) => {
    cart =  [];
    req.flash("success", "All Items removed from the Cart");
    res.redirect("/cart");
}


module.exports.updateCart = (req,res) => {
    let {id} = req.params;
    let {quantity} = req.body;
    //console.log(id);
    //console.log(quantity);

    const existingItemIndex = cart.findIndex(item => item.id === id);
    if(existingItemIndex !== -1){
        cart[existingItemIndex].quantity = quantity;
        req.flash("success", "quantity udpated");
    } else {
        req.flash("error", "Requested item doesn't exist");
    }

    res.redirect("/cart");
}

/* module.exports.cart = async (req,res) => {
    //console.log(req.params);
    let {id} = req.params;
    const item = await Item.findById(id);
    if(!item){
        req.flash("error","Item you requested does not exist!");
        res.redirect("/items");
    }

    let originalImageUrl = item.image.url;
    originalImageUrl = originalImageUrl.replace("?", "?w=250&h=250&");

    res.render("carts/cart.ejs", {item, originalImageUrl});
} *


module.exports.renderCheckoutForm = async (req,res) => {
    let user = await User.findById(req.user._id).populate("address");
    let addressLength = user.address.length;
    //console.log(user);
    //console.log(addressLength)
    res.render("carts/checkout.ejs", {user,addressLength});
}

module.exports.createAddress = async(req,res) => {
    let user = await User.findById(req.user._id);
    //console.log(req.body);
    const newAddress = new Address(req.body);
    newAddress.user = req.user._id;
    user.address.push(newAddress)
    //console.log(newAddress);
    await newAddress.save();
    await user.save();
    req.flash("success", "New Address Added");
    res.redirect("/cart/checkout");
}

module.exports.renderOrderSummaryPage = async (req,res) => {
    /* console.log(req.body);
    const addressId = req.body;

    let address = await Address.findById(addressId); *
    let user = await User.findById(req.user._id);
    let totalPrice = await cart.reduce((total, item) => total + (item.price*item.quantity), 0);
    res.render("carts/orderSummary.ejs", {cart, totalPrice, user, /* address *});
}

module.exports.renderOrderSummaryPageWithAddress = async (req,res) => {
    const {addressId} = req.body;
    //console.log(req.body);
    const address = await Address.findById(addressId);
    let totalPrice = await cart.reduce((total, item) => total + (item.price*item.quantity), 0);
    res.render("carts/orderSummary.ejs", {cart, totalPrice,  address });
} */