const Item = require("../models/item.js");


module.exports.index = async (req,res) => {
    const allItems = await Item.find({});
    const sort = req.query.sort;
    //console.log(req.query.sort);
    // Filtering Logic 
  let filteredItems = allItems; // Start with all items

  const selectedCategories = req.query.category || []; // Handle empty categories
  const selectedPriceRanges = req.query.price || []; // Handle empty prices

 
  if (selectedCategories.length > 0) {
    filteredItems = filteredItems.filter(item => {
      return item.category.some(itemCat => 
        selectedCategories.some(category => itemCat.toLowerCase().includes(category.toLowerCase()))
      );
    });
  }

  // Filter based on selected price ranges (if any)
  if (selectedPriceRanges.length > 0) {
    filteredItems = filteredItems.filter(item => {
      for (const priceRange of selectedPriceRanges) {
        if (priceRange.includes('>')) {
          const minPrice = parseInt(priceRange.split('>')[1]);
          if (item.price > minPrice) {
            return true; // Found a match, exit the inner loop
          }
        } else {
          const [minPrice, maxPrice] = priceRange.split('-');
          if (item.price >= minPrice && item.price <= maxPrice) {
            return true; // Found a match, exit the inner loop
          }
        }
      }
      return false; // No price range match found for this item
    });
  }

    let sortedItems = filteredItems;

    if (sort) {
        const [field, direction] = sort.split('-');
        //console.log(field);
        sortedItems.sort((a, b) => {
            //console.log("a"+a);
            //console.log("b"+b);
          if (field === 'price') {
            return direction === 'asc' ? a.price - b.price : b.price - a.price;
          } else if (field === 'name') {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            return direction === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
          }
          // Add sorting logic for other criteria (rating, date, etc.)
          return 0; // Default sort if criteria not found
        });
      }

    res.render("items/index.ejs", {allItems: sortedItems, sort})
    //res.render("items/index.ejs", {allItems});
};





module.exports.renderNewForm = (req,res) => {
    res.render("items/new.ejs"); 
};

module.exports.createItem = async(req,res) => {

    let url = req.file.path;
    let filename = req.file.filename;
    
    const newItem = new Item(req.body.item);
    newItem.owner = req.user._id;
    newItem.image = {url,filename};
    await newItem.save();
    req.flash("success","New Item Added!");
    res.redirect("/items");
};



module.exports.showItem = async (req,res) => {
    const allItems = await Item.find({});
    let {id} = req.params; 
    const item = await Item.findById(id)
    .populate({
        path:"reviews",
        populate: {
            path: "author"
        },
    })
    .populate("owner");
    if(!item){
        req.flash("error","Item you requested does not exist!");
        res.redirect("/items");
    }

    const itemCategory = item.category;
    //console.log(itemCategory);
    // 3. Filter allItems Based on Category (Corrected Logic):
    let filteredItems = [];
    /* if (itemCategory.length > 0) {
      filteredItems = await Item.find({ category: { $in: itemCategory } }); // Corrected filtering logic
    } */
    
    if (itemCategory.length > 0) {
      filteredItems = allItems.filter(item => {
        return item.category.some(itemCat => 
          itemCategory.some(category => itemCat.toLowerCase().includes(category.toLowerCase()))
          );
        });
      }
      //console.log(filteredItems);

    res.render("items/show.ejs", {item, filteredItems});
};


module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
    const item = await Item.findById(id);
    if(!item){
        req.flash("error","Item you requested does not exist!");
        res.redirect("/items");
    }
    if(!item.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have the permission to edit");
        return res.redirect(`/items/${id}`);
    }


    let originalImageUrl = item.image.url;
    originalImageUrl = originalImageUrl.replace("?", "?w=250&h=250&");

    res.render("items/edit.ejs", {item, originalImageUrl});
};


module.exports.updateItem = async (req,res) => {
    
    let {id} = req.params;
    let item = await Item.findByIdAndUpdate(id,{...req.body.item}); // to aa listing ma update khali je req.body ma che ej thase etle file hase ae update nai thay etle aapi image pan update nai thay
    // so for we have to write logic for it

    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        item.image = {url, filename};
        await item.save();
    }

    // to pehla aapde update kari didhu pan ema image update nai thay hoy etle ena mate pachi image na property save karai listing ma
// ane jo aapde image upload j nai karye to req.file to kahli hasse to pachi image save thay nai aelte dekhay pan nai so we put condition
    req.flash("success","Item Updated!");
    res.redirect(`/items/${id}`);
};

module.exports.destroyItem = async (req,res) => {
    let {id} = req.params;
    let deletedItem = await Item.findByIdAndDelete(id);
    //console.log(deletedItem);
    req.flash("success","Item Deleted!");
    res.redirect("/items");
}

/* module.exports.sortItems = async (req,res) => {
    const allItems = await Item.find({});
    const sort = req.query.sort;
    //console.log(req.query.sort);
    let sortedItems = [...allItems];

    if (sort) {
        const [field, direction] = sort.split('-');
        //console.log(field);
        sortedItems.sort((a, b) => {
            //console.log("a"+a);
            //console.log("b"+b);
          if (field === 'price') {
            return direction === 'asc' ? a.price - b.price : b.price - a.price;
          } else if (field === 'name') {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            return direction === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
          }
          // Add sorting logic for other criteria (rating, date, etc.)
          return 0; // Default sort if criteria not found
        });
      }

      res.render("items/index.ejs", {allItems: sortedItems, sort})
} */



function filterProducts(products, selectedPrices) {
    return products.filter(product => {
      const price = product.price; // Replace "price" with the actual price field in your data
      for (const selectedPrice of selectedPrices) {
        const range = selectedPrice.split('-');
        const minPrice = parseInt(range[0]);
        const maxPrice = parseInt(range[1]);
        if (price >= minPrice && price <= maxPrice) {
          return true; // Product falls within a selected price range
        }
      }
      return false; // Product doesn't match any selected price range
    });
  }

  module.exports.filterItems = async (req, res) => {
    const selectedCategories = req.body.category || []; // Handle empty categories
    const selectedPriceRanges = req.body.price || []; // Handle empty prices
    const allItems = await Item.find({});
  
    // Filter products based on selected categories and price ranges
    const filteredProducts = allItems.filter(product => {
      let categoryMatch = false;
      let priceMatch = false;
  
      // Check if product category matches any selected category
      if (selectedCategories.length === 0 || selectedCategories.includes(product.category)) {
        categoryMatch = true;
      }
      // Check if product price falls within any selected price range
    for (const priceRange of selectedPriceRanges) {
        const [minPrice, maxPrice] = priceRange.split('-');
        if (product.price >= minPrice && product.price <= maxPrice) {
          priceMatch = true;
          break; // Exit the loop if a match is found
        }
      }
  
      return categoryMatch && priceMatch; // Return true if both category and price match
    });
  
    // Render the page with filtered products
    res.render('items/index.ejs', { allItems: filteredProducts });
  };