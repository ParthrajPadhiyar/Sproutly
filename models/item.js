const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    gujname: String,
    description: String,
    
    image: {
        url: String,
        filename: String,  
    },
    price: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: [String],
});

itemSchema.post("findOneAndDelete", async (item) => {
    if(item){
        await Review.deleteMany({_id: {$in: item.reviews}}); 
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;