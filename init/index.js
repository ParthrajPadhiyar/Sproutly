const mongoose = require("mongoose");
const initData = require("./data.js");
const Item = require("../models/item.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/sproutly";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});


const initDB = async () => {
    await Item.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "664dc36116f1039df0dfc9fa"
    }));
    await Item.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();