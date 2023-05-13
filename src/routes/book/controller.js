const { default: mongoose } = require("mongoose");
const Controller = require("../controller");

module.exports = new class extends Controller {

    async showAllBooks(req,res){
        const books = await this.Book.find();
        
        this.response(
            {   res,
                massage:"successfuly get",
                data:books
            })
    }

    async showBook(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,
                massage:"invalid id",
                code:401
            })
        }

        const book = await this.Book.findById(req.params.id);
        
        if(!book){
            return this.response({
                res,
                massage : "this book dosen't exist.",
                code : 400
            });
        }
        
        this.response({
            res,
            massage:"successfuly get",
            data:book
        })
    }

    async addBook(req,res){
        let book = new this.Book({
            name   : req.body.name,
            author : req.body.author,
            edit   : req.body.edit,
            pages  : req.body.pages,
        });


        book = await book.save();

        this.response({
            res,
            massage:"successfuly add",
            data:book
        })

    }

    async updateBook(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,
                massage:"invalid id",
                code:401
            })
        }

        const book = await this.Book.findByIdAndUpdate(req.params.id,{
            name : req.body.name,
            author : req.body.author,
            edit : req.body.edit,
            pages : req.body.pages,
        },{new:true});

        if(!book)
            return this.response({
                res,
                massage:"tihs book dosen't exsit.",
                code :400
            });

        this.response({
            res,
            massage:"successfuly update",
            data:book
        })
        
    }

    async deleteBook(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,
                massage:"invalid id",
                code:401
            })
        }

        const book = await this.Book.findByIdAndRemove(req.body.id);
        
        if(!book){
            return this.response({
                res,
                massage:"book don't find",
                code:400
            });
        }

        

        this.response({
            res,
            massage: "successfuly delete.",
            data:book
        })
    }


}