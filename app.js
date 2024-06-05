if(process.env.NODE_ENV != "production"){  // aa condition etle muki km k atyare aapde development phase ma che to aapde .env file no use kari sakie pan jo aapde website host karie ke shre karie to aapde kyare pan .env file ne share nai karvani 
    // atle jyare aapde host karsu to aapde navo environmental variable banavsu NODE_ENV ane eni value production set kari daisu
    require("dotenv").config();
}

//console.log(process.env); // in this process.env ma bav badha environmental variables print thaya pan aapdne only SECRET j joi che
//console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const MongoStore = require("connect-mongo");

const User = require("./models/user.js");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const itemRouter = require("./routes/item.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const cartRouter = require("./routes/cart.js");
const homeRouter = require("./routes/home.js");
const wishlistRouter = require("./routes/wishlist.js");
//const orderRouter = require("./routes/order.js");


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MongoStore Session", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7days 24 hours 60 min 60 sec 1000millisec
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // it is for security search crossscripting attacks for preventing it
    },
};



app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // passport ni andar je aapde local Strategy create kari che atle je pan request aave user ni ae local strategy thi authenticate hova joie ane ae user ne authenticate karva mate aapde autehnticate() nethod no use karie che

passport.serializeUser(User.serializeUser()); // it is use for serialize the user  mean Generates a function that is used by Passport to serialize users into the sessions   atle user thi related je pan information session ma store karie ae serialize
passport.deserializeUser(User.deserializeUser()); // ane user ni information remove karva deserialize


app.use((req,res,next) => {
    res.locals.success = req.flash("success");  
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; 
    next();
});



//const MONGO_URL = "mongodb://127.0.0.1:27017/sproutly";



/* async function main(){
    await mongoose.connect(MONGO_URL);
} */

async function main(){
    await mongoose.connect(dbUrl);
}

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});


app.use("/", homeRouter);

app.use("/",userRouter);

app.use("/", wishlistRouter);

//app.use("/", orderRouter);

app.use("/items", itemRouter);



app.use("/items/:id/reviews", reviewRouter);

app.use("/", cartRouter);

// Error Handling

app.all("*", (req,res,next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err,req,res,next) => {
    let {statusCode=500, message="Something went Wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message});
})
