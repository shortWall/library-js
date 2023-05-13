const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const bookSchema= new mongoose.Schema({
    name   : {type:String , reqiured:true},
    author : {type:String , reqiured:true},
    pages  : {type:Number},
    edit   : {type:Number},
    users   : {type:[mongoose.Schema.Types.ObjectId] , ref:"User"}
});

bookSchema.plugin(timestamp);

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;