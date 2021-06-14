const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 64
    },
    lastName:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 64
    },
    email:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user',
        required: true
    }
}));

function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(1).max(64).required(),
        lastName: Joi.string().min(1).max(64).required(),
        email: Joi.string().min(1).max(255).required().email(),
        password: Joi.string().min(1).max(64).required(),
        role: Joi.string().valid('user','admin')
    };
  
    return Joi.validate(user, schema);
}
  

exports.User = User; 
exports.validate = validateUser;