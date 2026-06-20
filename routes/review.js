const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../model/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../model/listings.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewRouter = require("../controller/reviewController.js");

router
  .route("/")
  .post(validateReview, isLoggedIn, wrapAsync(reviewRouter.createReview));

router
  .route("/:reviewId")
  .delete(isLoggedIn, isReviewAuthor, wrapAsync(reviewRouter.destroyReview));

module.exports = router;
