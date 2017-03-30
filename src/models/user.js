"use strict";

import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true
    },

    facebookId: {
        type: String,
        index: true
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    password: {
        type: String
    },

    apiKey: {
        type: String
    }
    
}, {timestamps: true});

let User = mongoose.model('User', userSchema);

User.schema.path('email').validate(function (email) {
    return validator.isEmail(email);
});

User.schema.path('password').validate(function (password) {
    return validator.isLength(password, 6, 20);
});

export default User;