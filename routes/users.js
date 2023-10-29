const mongoose = require("mongoose")
const passportLocalmongoose = require("passport-local-mongoose")
mongoose.connect("mongodb://0.0.0.0/social")

const userSchema = mongoose.Schema({
  username : String,
  email : String,
  password : String,
  picture : String,
  age : Number,
  likes:Number
})
userSchema.plugin(passportLocalmongoose);
module.exports = mongoose.model("user",userSchema)