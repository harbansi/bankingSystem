const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const _ = require("lodash");


const ejs = require("ejs");
const router = express.Router();
const User = require('../models/users');
const Transaction = require("../models/transaction");

const users = require('../seed/userSeeder');

const { Router } = require('express');
const { render } = require('ejs');


router.get('/', function (req, res) {
    res.render('home', { title: 'home page' });
});

router.get('/newUser', function (req, res) {
    res.render('newUser', { title: 'newUser', msg: '' });
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
            res.render('newUser', { title: 'New User', msg: "User already Exist!!" });
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
                    res.render('newUser', { title: 'New User', msg: "User Added Successfully" });
                })
                .catch(err => console.log(err));
        }
    });
});


//transaction route
router.get('/transferMoney', function (req, res) {
    User.find({}, function (err, foundusers) {
        res.render('transferMoney', { title: 'transferMoney', msg: '', users: foundusers });
    })
});


router.post('/transferMoney', function (req, res) {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const amount = req.body.amount;

    // console.log(sender);
    // console.log(receiver);
    // console.log(amount);

    const sender1 = User.findOne({ email: sender });
    const receiver1 = User.findOne({ email: receiver });
    // console.log(sender1);
    // console.log(receiver1);



    User.find({}, function (err, foundusers) {
        if (!sender1 || !receiver1) {
            res.redirect('/transferMoney');
                }

        if (sender1.current_balance > 0 && amount < sender1.current_balance && amount > 0) {
            const newTransaction = new Transaction({
                sender: sender1.email,
                receiver: receiver1.email,
                amount: amount
            });
            newTransaction.save();

            const am = parseInt(receiver1.current_balance) + parseInt(amount);
            User.findOneAndUpdate({ email: sender }, { current_balance: parseInt(sender.current_balance) - parseInt(amount) });
            User.findOneAndUpdate({ email: receiver }, { current_balance: am });      

        }
        else if (amount > sender.current_balance) {
            res.render('transferMoney', { title: 'TransferMoney', msg: " Sender doesn't have enough balance for payment  ", users: foundusers });
        }
        else {
            res.redirect('/transferMoney');
        }

    });
});


router.get('/history', function (req, res) {
    res.render('history', { title: 'Transection History' })
});


module.exports = router;