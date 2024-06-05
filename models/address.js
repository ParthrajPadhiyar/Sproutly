const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    mobile:{
        type: String,
        required: true,
    },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;