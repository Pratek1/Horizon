const express = require("express");
const router = express.Router();
const Listing = require("../model/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingRouter = require("../controller/listingController.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingRouter.indexListing))
  .post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingRouter.createListing));


router.route("/new").get(isLoggedIn, listingRouter.newListing);

router
  .route("/:id")
  .get(wrapAsync(listingRouter.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingRouter.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingRouter.destroyListing));

//!When we pass validateListing() as a middleware error occurs.
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingRouter.editListing));

module.exports = router;
