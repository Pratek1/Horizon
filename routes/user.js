const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../model/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userRouter = require("../controller/userController.js");

router
  .route("/signup")
  .get(wrapAsync(userRouter.getSignup))
  .post(wrapAsync(userRouter.postSignup));

router
  .route("/login")
  .get(wrapAsync(userRouter.getLogin))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),

    wrapAsync(userRouter.postLogin)
  );

router.route("/logout")
  .get(userRouter.getLogout);

module.exports = router;
