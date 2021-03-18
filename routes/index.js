const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const _ = require("lodash");


const ejs = require("ejs");
const router = express.Router();
const User = require('../models/users');
const users = require('../seed/userSeeder');

const { Router } = require('express');
const { render } = require('ejs');


router.get('/', function (req, res) {
    res.render('home', { title: 'home page' });
});

router.get('/newUser', function (req, res) {
    res.render('newUser', { title: 'newUser', msg:'' });
});

router.get('/users', function (req, res) {
    User.find({}, function (err, foundusers) {
        if (foundusers.length === 0) {
            User.insertMany(users, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("successfully inserted");
                }
            });
        }
        else {
            res.render('users', { title: 'Users', users: foundusers });
        }
    });
});

//add user into database 
router.post('/newUser', function (req, res, next) {
    const name = _.startCase(_.camelCase(req.body.name));
    const email = req.body.email;
    const current_balance = req.body.current_balance;

    User.findOne({ email: email }).then(user => {
        if (user) {
            res.render('newUser', { title: 'New User',msg: "User already Exist!!" });
        }
        else {
            const users = new User({
                name,
                email,
                current_balance
            });
            users
                .save()
                .then(user => {
                    res.render('newUser', { title: 'New User',msg: "User Added Successfully" });
                })
                .catch(err => console.log(err));
        }
    });
});

router.get('/transferMoney', function (req, res) {
    User.find({}, function (err, users) {
        res.render('transferMoney', { title: 'Money Tranfer', users: users })

    });
});


router.get('/history', function (req, res) {
    res.render('history', { title: 'Transection History' })
});


module.exports = router;