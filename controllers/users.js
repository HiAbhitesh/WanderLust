const User = require("../models/user");

module.exports.renderSignupform = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User ({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginform = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((error) => {  // callback 
        if (error) {
            return next(error);
        }
        req.flash("success", "You logged out!");
        res.redirect("/listings");
    });
};
