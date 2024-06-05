const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
    },  // here we only define email  bcs username and password automatically define by passportLocalMongoose so we not have to define in our schema
    mobile: {
        type: String,
    },
    address: [{
        type: Schema.Types.ObjectId,
        ref: "Address",
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);