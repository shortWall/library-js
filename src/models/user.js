const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");


const userSchema = new mongoose.Schema({
    first_name : {type:String , required : true},
    last_name  : {type:String , required : true},
    username   : {type:String , required : true , unique:true},
    email      : {type:String },
    password   : {type:String , required : true},
    isAdmin    : {type:Boolean , default : false},
    books      : {type:[mongoose.Schema.Types.ObjectId], ref:"Book",default:[]}
})

userSchema.plugin(timestamp);

const User = mongoose.model("User",userSchema);

module.exports = User;