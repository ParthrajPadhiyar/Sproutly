const Wishlist = require('../models/wishlist');
const Item = require('../models/item');

module.exports.createWishlist = async (req, res) => {
  const { id } = req.body;

  try {
    const itemToAdd = await Item.findById(id);
    if (!itemToAdd) {
      req.flash("error", "Item you requested does not exist!");
      return res.redirect(req.headers.referer);
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        items: [{ item: itemToAdd._id }]
      });
    } else {
      const existingItemIndex = wishlist.items.findIndex(wishlistItem => wishlistItem.item.toString() === id);
      if (existingItemIndex === -1) {
        wishlist.items.push({ item: itemToAdd._id });
      } else {
        req.flash("success", "Your Item is already added to your wishlist");
        return res.redirect(req.headers.referer);
      }
    }

    await wishlist.save();
    req.flash("success", "Item added to your wishlist");
    res.redirect(req.headers.referer);

  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to add item to wishlist");
    res.redirect(req.headers.referer);
  }
};

module.exports.renderWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.item');
    res.render("carts/wishlist.ejs", { wishlist: wishlist ? wishlist.items : [] });
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to load wishlist");
    res.redirect('/');
  }
};

module.exports.destroyWishlistItem = async (req, res) => {
  const { id } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.items = wishlist.items.filter(item => item.item.toString() !== id);
      await wishlist.save();
      req.flash("success", "Item removed from the wishlist");
    } else {
      req.flash("error", "Wishlist not found");
    }
    res.redirect("/wishlist");

  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to remove item from wishlist");
    res.redirect("/wishlist");
  }
};

module.exports.destroyWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ user: req.user._id });
    req.flash("success", "All Items removed from the wishlist");
    res.redirect("/wishlist");

  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to clear wishlist");
    res.redirect("/wishlist");
  }
};
