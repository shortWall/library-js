const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator")

router.get('/',
controller.showAllBooks.bind(controller));

router.get('/:id',
controller.showBook.bind(controller));


router.post('/',
validator.bookValidator(),
controller.validate.bind(controller),
controller.addBook.bind(controller));

router.put("/:id",
validator.bookValidator(),
controller.validate.bind(controller),
controller.updateBook.bind(controller));

router.delete("/:id",
controller.deleteBook.bind(controller));


module.exports = router;