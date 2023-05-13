const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new class{
    bookValidator(){
        return [
            check("name","name can't be empty").notEmpty(),
            check("author","author can't be empty").notEmpty(),
            check("edit","edition must be number").isNumeric(),
            check("pages","pages must be number").isNumeric(),
        ];
    }

}