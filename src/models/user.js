const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    dob: {
        type: Date,
    },
    zip: {
        type: String,
    },
    gender: {
        type: String,
    },
    city: {
        type: String,
    }
    
},{timestamps: true});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;