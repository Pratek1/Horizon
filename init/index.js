const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listings.js");

main()
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "65be11403e4e3aadd14c0227"}));
  const data = await Listing.insertMany(initData.data);
  console.log(data);
};

initDB();
