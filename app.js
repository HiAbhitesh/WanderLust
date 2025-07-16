if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
// console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js"); 
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Router
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Calling main function 
main().then(() =>{
    console.log("Connect to DB");
}).catch(err => {
    console.log(err);
});

// Create a Database
async function main(){
    // await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    await mongoose.connect(process.env.ATLASDB_URL);
};

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "/public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mongo Session Store
const Store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

Store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

// Session
const sessionOptions = {
    store: Store,
    secret: process.env.SECRET, 
    resave: "false", 
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// app.get("/", (req, res) =>{
//     res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;  
    next();
});

// app.get("/registerDemo", async(req, res) => {
//     let fakeUser = new User ({
//         email: "student@gmail.com",
//         username: "Abhi",
//     });

//     let newUser = await User.register(fakeUser, "helloworld");
//     res.send(newUser);
// });

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/", userRouter);

// Sample Listings
// app.get("/testListing", async(req, res) =>{
//     let sampleListing = new Listing ({
//         title: "My New Villa",
//         description: "By the Beach",
//         price: 1000000,
//         location: "Patna, Bihar",
//         country: "India",
//     });
//     await sampleListing.save();  //.save return promises
//     console.log("Sample was Saved");
//     res.send("Successful testing");
// });


// 404 Handler
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", {message});
//   res.status(statusCode).render("error", { statusCode, message });
});

const port = 8080;
app.listen(port, () =>{
    console.log(`Server is listening to port ${port}`);
});
