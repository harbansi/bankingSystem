const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:{
        type: Number, 
    },
    email:{
        type:String,
        required:true
    },
    name: {
       type: String , 
       required:true 
    },
    current_balance: {
        type:Number,
        required:true
    },
    
});


const User = mongoose.model('user', userSchema);

module.exports = User;
