"use strict";

import mongoose from 'mongoose';
import Problem from './problem';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    details: {
        type: String,
        required: true
    },

    problem: {
        type: mongoose.Schema.ObjectId,
        ref: 'Problem'
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

commentSchema.post('save', function(comment, next){
    Problem.increaseComments(comment.problem, 1, function(){});
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

