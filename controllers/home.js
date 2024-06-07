const Item = require("../models/item.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const nodemailer = require("nodemailer");

module.exports.home = async (req, res) => {
  try {
    const allCategories = await Item.distinct("category");
    const allItems = await Item.find({});
    const allReviews = await Review.find({}).populate("author");

    res.render("home/home.ejs", { allItems, allReviews, allCategories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
};


module.exports.searchItem = async (req, res) => {
  const allItems = await Item.find({});
  const query = req.query.q.toLowerCase();
  const filteredItems = allItems.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );
  res.render("items/search.ejs", { results: filteredItems });
}

module.exports.giveHomeReview = async (req, res) => {
  const originalUrl = req.originalUrl;
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  await newReview.save();
  req.flash("success", "New Review Created!");
  res.redirect("/");
}

module.exports.destroyHomeReview = async (req, res) => {
  let { reviewId } = req.params;

  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!");
  res.redirect("/");
};

module.exports.renderAbout = (req, res) => {
  res.render("home/aboutUs.ejs");
}

module.exports.renderHelp = (req, res) => {
  res.render("home/helpCenter.ejs");
}

module.exports.renderContact = (req, res) => {
  res.render("home/contactUs.ejs");
}

module.exports.contactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;



  if (!name || !email || !subject || !message) {
    req.flash("error", "All fields are required");
    return res.redirect(req.headers.referer);
  }

  if (res.locals.currUser.email === email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        req.flash("error", "User not found")
        return res.redirect(req.headers.referer);
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: subject,
        text: `From: ${name} - ${email}\n\n${message}`
      };

      transporter.sendMail(mailOptions);
      req.flash("success", "Message Sent");
      res.redirect(req.headers.referer);

    } catch (error) {
      console.log(error);
      req.flash("error", "Failed to send Message");
      res.redirect(req.headers.referer);
    }

  } else {
    req.flash("error", "Email is not matching with Current User");
    res.redirect(req.headers.referer);
  }





}






