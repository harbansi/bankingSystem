const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
});


const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
