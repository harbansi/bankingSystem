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


router.post('/transferMoney', async function (req, res) {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const amount = req.body.amount;

    // console.log(sender);
    // console.log(receiver);
    // console.log(amount);

    const sender1 = await User.findOne({ email: sender });
    const receiver1 = await User.findOne({ email: receiver });
   

    User.find({}, async function (err, foundusers) {

        if( sender1 == receiver1){
            res.render('transferMoney', { title: 'TransferMoney', msg: "Sorry!! You can not transfer money to the same account.", users: foundusers });

        }
        if (!sender1 || !receiver1) {
            res.render('transferMoney', { title: 'TransferMoney', msg: " User doesn't Exist!!", users: foundusers });

        }

        else if (sender1.current_balance > 0 && amount < sender1.current_balance && amount > 0) {
            const newTransaction = new Transaction({
                sender: sender1.email,
                receiver: receiver1.email,
                amount: amount
            });
            newTransaction.save();
            console.log("transaction done", newTransaction);

            const am = parseInt(receiver1.current_balance) + parseInt(amount);
            await User.findOneAndUpdate({ email: sender }, { current_balance: parseInt(sender1.current_balance) - parseInt(amount) });
            await User.findOneAndUpdate({ email: receiver }, { current_balance: am });
            
            res.render('transferMoney', { title: 'TransferMoney', msg: " payment done successfully!  ", users: foundusers });

        }
        else if (sender1.current_balance < amount) {
            res.render('transferMoney', { title: 'TransferMoney', msg: " Sender doesn't have enough balance for payment.", users: foundusers });
        }
        else {
            res.render('transferMoney', { title: 'TransferMoney', msg: "Amount should be positive. ", users: foundusers });
        }

    });
});


router.get('/history', async function (req, res) {
    const transactions  = await Transaction.find({})
    res.render('history', {title:"Transaction History",transactions})
});


module.exports = router;