const express = require("express");
const Item = require("./models/item.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {itemSchema, reviewSchema, addressSchema} = require("./schema.js");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){ 
        req.session.redirectUrl = req.originalUrl; 
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let item = await Item.findById(id);
    if(!item.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this item");
        return res.redirect(`/items/${id}`);
    }
    next();
};


 module.exports.validateItem = (req,res,next) => {
    let {error} = itemSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else {
        next();
    }
};

module.exports.isReviewAuthor = async (req,res,next) => {
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the Author of this review");
        return res.redirect(`/items/${id}`);
    }
    next();
};

module.exports.validateAddress = (req,res,next) => {
    let {error} = addressSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else {
        next();
    }
};