const Book = require("../models/books");
const User = require("../models/user");
const {validationResult} =require("express-validator");

module.exports = class{
    constructor(){
        this.Book = Book;
        this.User = User;
    }

    validationBody(req,res){
        const result = validationResult(req);
        if(!result.isEmpty()){
            const errorrs = result.array();
            const massage = [];
            errorrs.forEach((err)=>massage.push(err.msg));

            this.response({
                res,
                massage,
                code : 400
            });
            return false;
        }
        return true;
    }

    validate(req,res,next){
        if(!this.validationBody(req,res))
            return;
        
            next();
    }


    response({res,massage,code=200,data={}}){
        res.status(code).json({
            massage,
            data
        });
    }

}