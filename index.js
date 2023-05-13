const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const router =require("./src/routes");

mongoose.connect(config.get("db.address"))
.then(()=>console.log("connected to mongodb"))
.catch(()=>console.log("couldn't connect"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",router);


const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listen to port ${port}`));