const express = require("express");
const bookRouter = require("./book");
const userRouter = require("./users")

const router = express.Router();

router.use('/books',bookRouter);
router.use('/users',userRouter);


module.exports = router;