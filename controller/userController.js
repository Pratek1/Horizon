const User = require("../model/user.js");

module.exports.getSignup  = async (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.postSignup = async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      let registereduser = await User.register(newUser, password);

      req.login(registereduser, (err) => {
        if(err) {
          return next(err);
        }
        req.flash("success", "Welcome to Airbnb");
        res.redirect("/listings");
      })

    } catch (e) {
      req.flash("error", "Username already exists");
      res.redirect("/signup");
    }
  }
    
module.exports.getLogin = async (req, res) => {
  res.render("users/login.ejs");
}
    
module.exports.postLogin =  async (req, res) => {
  req.flash("success", "Welcome to Airbnb");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
  }
    
module.exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
