const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js"); 

module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    // console.log(allListings); // Check for duplicates
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async(req, res) =>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: {path: "author"}}).populate("owner");

    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    };
    // console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "..", filename);
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (result.error) {
        throw new ExpressError(400, result.error);
    }
    
    const newListing = new Listing(req.body.listing); 
    newListing.owner = req.user._id;  // Username is undefine
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");  // connect-flash
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);

    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    };

    // Preview the Image On edit page 
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250"); // Cloudinary Image transformation

    res.render("listings/edit.ejs", {listing, originalImageUrl});
};


module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    // 1. Get the listing document
    const listing = await Listing.findById(id);

    // 2. Update basic fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.country = req.body.listing.country;
    listing.location = req.body.listing.location;

    // 3. Update image only if a new file was uploaded
    if (typeof req.file !== "undefined") {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
    }

    // 4. Save and redirect
    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};



module.exports.destroyListing = async(req, res) =>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};