const Item = require("../models/item.js");


module.exports.index = async (req, res) => {
  const allItems = await Item.find({});
  const sort = req.query.sort;
  let filteredItems = allItems;

  const selectedCategories = req.query.category || [];
  const selectedPriceRanges = req.query.price || [];


  if (selectedCategories.length > 0) {
    filteredItems = filteredItems.filter(item => {
      return item.category.some(itemCat =>
        selectedCategories.some(category => itemCat.toLowerCase().includes(category.toLowerCase()))
      );
    });
  }


  if (selectedPriceRanges.length > 0) {
    filteredItems = filteredItems.filter(item => {
      for (const priceRange of selectedPriceRanges) {
        if (priceRange.includes('>')) {
          const minPrice = parseInt(priceRange.split('>')[1]);
          if (item.price > minPrice) {
            return true;
          }
        } else {
          const [minPrice, maxPrice] = priceRange.split('-');
          if (item.price >= minPrice && item.price <= maxPrice) {
            return true;
          }
        }
      }
      return false;
    });
  }

  let sortedItems = filteredItems;

  if (sort) {
    const [field, direction] = sort.split('-');
    sortedItems.sort((a, b) => {
      if (field === 'price') {
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (field === 'name') {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        return direction === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      }
      return 0;
    });
  }

  res.render("items/index.ejs", { allItems: sortedItems, sort });
};





module.exports.renderNewForm = (req, res) => {
  res.render("items/new.ejs");
};

module.exports.createItem = async (req, res) => {

  let url = req.file.path;
  let filename = req.file.filename;

  const newItem = new Item(req.body.item);
  newItem.owner = req.user._id;
  newItem.image = { url, filename };
  await newItem.save();
  req.flash("success", "New Item Added!");
  res.redirect("/items");
};



module.exports.showItem = async (req, res) => {
  const allItems = await Item.find({});
  let { id } = req.params;
  const item = await Item.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      },
    })
    .populate("owner");
  if (!item) {
    req.flash("error", "Item you requested does not exist!");
    res.redirect("/items");
  }

  const itemCategory = item.category;
  let filteredItems = [];


  if (itemCategory.length > 0) {
    filteredItems = allItems.filter(item => {
      return item.category.some(itemCat =>
        itemCategory.some(category => itemCat.toLowerCase().includes(category.toLowerCase()))
      );
    });
  }

  res.render("items/show.ejs", { item, filteredItems });
};


module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const item = await Item.findById(id);
  if (!item) {
    req.flash("error", "Item you requested does not exist!");
    res.redirect("/items");
  }
  if (!item.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have the permission to edit");
    return res.redirect(`/items/${id}`);
  }


  let originalImageUrl = item.image.url;
  originalImageUrl = originalImageUrl.replace("?", "?w=250&h=250&");

  res.render("items/edit.ejs", { item, originalImageUrl });
};


module.exports.updateItem = async (req, res) => {

  let { id } = req.params;
  let item = await Item.findByIdAndUpdate(id, { ...req.body.item });

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    item.image = { url, filename };
    await item.save();
  }


  req.flash("success", "Item Updated!");
  res.redirect(`/items/${id}`);
};

module.exports.destroyItem = async (req, res) => {
  let { id } = req.params;
  let deletedItem = await Item.findByIdAndDelete(id);
  req.flash("success", "Item Deleted!");
  res.redirect("/items");
}





function filterProducts(products, selectedPrices) {
  return products.filter(product => {
    const price = product.price;
    for (const selectedPrice of selectedPrices) {
      const range = selectedPrice.split('-');
      const minPrice = parseInt(range[0]);
      const maxPrice = parseInt(range[1]);
      if (price >= minPrice && price <= maxPrice) {
        return true;
      }
    }
    return false;
  });
}

module.exports.filterItems = async (req, res) => {
  const selectedCategories = req.body.category || [];
  const selectedPriceRanges = req.body.price || [];
  const allItems = await Item.find({});

  const filteredProducts = allItems.filter(product => {
    let categoryMatch = false;
    let priceMatch = false;

    if (selectedCategories.length === 0 || selectedCategories.includes(product.category)) {
      categoryMatch = true;
    }
    for (const priceRange of selectedPriceRanges) {
      const [minPrice, maxPrice] = priceRange.split('-');
      if (product.price >= minPrice && product.price <= maxPrice) {
        priceMatch = true;
        break;
      }
    }

    return categoryMatch && priceMatch;
  });

  res.render('items/index.ejs', { allItems: filteredProducts });
};