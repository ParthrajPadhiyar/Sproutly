const mongoose = require("mongoose");
const initData = require("./data.js");
const Item = require("../models/item.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/sproutly";
const dbUrl = process.env.ATLASDB_URL;

async function main(){
    await mongoose.connect("mongodb+srv://TheLearnerParth:S4S3xl4y1K3sq10b@cluster0.zdgfqdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
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
        //owner: "664dc36116f1039df0dfc9fa"
        owner: "6662ecaf88f8a323921d4311"
    }));
    await Item.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();