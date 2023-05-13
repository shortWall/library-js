const Controller = require("../controller");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

module.exports = new class extends Controller{

    async register(req,res){
        let newUser = await this.User.findOne({username:req.body.username});

        if(newUser){
            return this.response({
                res,
                massage : "this username already exist.",
                code : 400
            });
        }
        newUser = new this.User(_.pick(req.body,["first_name","last_name","username","email","password","isAdmin","books"]));

        const slat = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password,slat);

        newUser = await newUser.save();


        
        this.response({
            res,
            massage: "sucessfuly register.",
            data : _.pick(newUser,["first_name","last_name","username","email"])
        });
    }

    async login(req,res){
        const user = await this.User.findOne({username:req.body.username});

        if(!user){
            return this.response({
                res,
                massage : "this username dosen't exist.",
                code : 400
            });
        }

        const result = await bcrypt.compare(req.body.password,user.password);

        if(!result){
            return this.response({
                res,
                massage:"incorrect password.",
                code:400
            });
        }

        const token = jwt.sign({_id:user._id},config.get("jwt_key"));

        this.response({
            res,
            massage:"successfuly login",
            data:{token}
        });
    }

    async addBook(req,res){
        const token = req.header("token");

        if(!token) return res.status(401).send("access denied");
        
        try{

            const decode = jwt.verify(token,config.get("jwt_key"))

            let user = await this.User.findById(decode._id)
            let book = await this.Book.findById(req.body.id);

            if(!book){
                return this.response({
                    res,
                    massage :"book not find.",
                    code:400
                })
            }
            
            user.books.push(req.body.id);

            user = await user.save();

            //
          
            book.users = decode._id;
            book = await book.save();
            //

            this.response({
                res,
                massage:"book successfuly added.",
                data : {user:_.pick(user,["username","books"]),
                        book}
            });
        }catch(err){
            res.status(400).send("invalid token");
        }
    }

    async showUser(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,
                massage:"invalid id",
                code:401
            })
        }
       
        const user = await this.User.findById(req.params.id).populate("books")
        if(!user){
            return this.response({
                res,
                massage : "user.",
                code : 400
            });
        }
        
        this.response({
            res,
            massage:"success",
            data:_.pick(user,["first_name","last_name","email","books"])
        })

    }

    async removeBook(req,res){
        const token = req.header("token");
        if(!token) return res.status(401).send("access denied.");

        try{
            const decode = jwt.verify(token,config.get("jwt_key"));

            let user = await this.User.findById(decode._id);
            
            let book = await this.Book.findById(req.body.id);

            if(!book){
                return this.response({
                    res,
                    massage :"book not find.",
                    code:400
                })
            }

            user.books = user.books.filter((book)=> book != req.body.id);

            user = await user.save();

            
            if(book.users.length>3)
                book.users.shift();
            
            
            book = await book.save();
          
            this.response({
                res,
                massage : "OK",
                data: {user:_.pick(user,["first_name","last_name","email","books"]),book}
            });
            
        }catch(er){
            res.status(400).send("invalid token");
        }

    }
}