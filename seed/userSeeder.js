const User = require('../models/users');

const users= [
    new User({
        user_id: 01,
        name: 'Harbansi Darji',
        email: 'darji.harbansi@gmail.com',
        current_balance: 10000
    }),
    new User({
        user_id: 02,
        name: 'Khushi Dave',
        email: 'davekhushi@gmail.com',
        current_balance: 50000
    }),
    new User({
        user_id: 03,
        name: 'Shraddha Tandel',
        email: 'shraddhatandel@gmail.com',
        current_balance: 12000
    }),
    new User({
        user_id: 04,
        name: 'Rohan Agrawal',
        email: 'rohanagrawal@gmail.com',
        current_balance: 5000
    }),
    new User({
        user_id: 05,
        name: 'Dhaivat Naik',
        email: 'dhaivatnaik@gmail.com',
        current_balance: 2900
    }),
    new User({
        user_id: 06,
        name: 'Soham Chauhan',
        email: 'sohamchauhan@gmail.com',
        current_balance: 4000
    }),
    new User({
        user_id: 07,
        name: 'Ramya Sai',
        email: 'ramya@gmail.com',
        current_balance: 4700
    }),
    new User({
        user_id: 08,
        name: 'Naitik Patel',
        email: 'naitikpatel@gmail.com',
        current_balance: 800
    }),
    new User({
        user_id: 09,
        name: 'Rajvi Shah',
        email: 'rajvishah@gmail.com',
        current_balance: 8000
    }),
    
];

module.exports = users;

