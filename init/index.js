const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");

// Calling main function 
main().then(() =>{
    console.log("Connect to DB");
}).catch(err => {
    console.log(err);
});

// Create a Database
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6862b508165917f7950178ac"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();