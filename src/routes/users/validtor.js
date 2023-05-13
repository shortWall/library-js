const {check} = require("express-validator");

module.exports = new class {
    registerValidator(){
        return [
            check("first_name","name can't be empty").notEmpty(),
            check("last_name" ,"name can't be empty").notEmpty(),
            check("username"  ,"username can't be empty").notEmpty(),
            check("email"     ,"you muse write email").isEmail(),
            check("password"  ,"password can't be empty").notEmpty(),
        ];
    }

    loginValidator(){
        return [
            check("username"  ,"username can't be empty").notEmpty(),
            check("password"  ,"password can't be empty").notEmpty(),
        ];
    }

}