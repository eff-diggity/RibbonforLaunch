const mongoose = require('mongoose');
const validator = require('validator');

const Admin = mongoose.model('Admin', { 
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalida')
            }
        }
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Admin