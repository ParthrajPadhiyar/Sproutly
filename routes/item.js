const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Item = require("../models/item.js");

const {isLoggedIn, isOwner,validateItem} = require("../middleware.js");


const itemController = require("../controllers/item.js");

const multer = require("multer");


const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); 

router.route("/")
.get(wrapAsync(itemController.index))
.post(isLoggedIn , upload.single("item[image]"), validateItem, wrapAsync(itemController.createItem));

router.get("/new",isLoggedIn, itemController.renderNewForm);



router.route("/:id")
.get(wrapAsync(itemController.showItem))
.put(isLoggedIn, isOwner, upload.single("item[image]"),validateItem,wrapAsync(itemController.updateItem))
.delete(isLoggedIn , isOwner, wrapAsync(itemController.destroyItem));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(itemController.renderEditForm));

// filter route
router.route("/filter")
.post(wrapAsync(itemController.filterItems));


module.exports = router;


