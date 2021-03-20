const express = require('express');
const bodyParser = require('body-parser');
const ejs=require("ejs");
const mongoose = require('mongoose');
const _=require("lodash");


const app = express();

mongoose.connect("mongodb+srv://harbansi:test123@cluster0-ypdnf.mongodb.net/bankingSystemDB", { useNewUrlParser: true ,useUnifiedTopology: true});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// EJS
app.set('view engine', 'ejs');

//public folder static path 
app.use(express.static("public"));

//routes

app.use('/', require('./routes/index.js'));




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(req,res){
    console.log('server has started Successfully');
});
