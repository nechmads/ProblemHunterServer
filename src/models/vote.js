"use strict";

import mongoose from 'mongoose';
import Problem from './problem';

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
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

voteSchema.post('save', function(vote, next){
    Problem.increaseUpvotes(vote.problem, 1, function(){});
    next();
});

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;