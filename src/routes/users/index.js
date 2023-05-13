const express = require("express");
const validator = require("./validtor")
const router = express.Router();
const controller = require("./controller");

router.post("/register",
validator.registerValidator(),
controller.validate.bind(controller),
controller.register.bind(controller));

router.post("/login",
validator.loginValidator(),
controller.validate.bind(controller),
controller.login.bind(controller));

router.post("/addbook",
controller.addBook.bind(controller));

router.post("/removebook",
controller.removeBook.bind(controller));

router.get("/showuser/:id",
controller.showUser.bind(controller));



module.exports = router;