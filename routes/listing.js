const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const path = require("path");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


// router.route
router.route("/")
.get(wrapAsync(listingController.index))
.post( isLoggedIn, upload.single("image"), wrapAsync(listingController.createListing));


// New Route  -> New Write Before Show Route because it considered as a Id  
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn, isOwner, validateListing,
    upload.single("image"),
    wrapAsync(listingController.updateListing)
)
.put(
    isLoggedIn, isOwner, validateListing,
    upload.single("image"),
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;