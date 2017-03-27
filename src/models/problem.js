"use strict";

import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    upvotes: {
        type: Number,
        default: 0
    },

    comments: {
        type: Number,
        default: 0
    },
    
    created_at: {
        type: Date,
        default: Date.now
    }
});

problemSchema.statics.increaseUpvotes = (problemId, numberOfUpvotes) => {
    return Problem.update({_id: problemId}, {$inc: {upvotes: numberOfUpvotes}}).exec();
}

problemSchema.statics.increaseComments = (problemId, numberOfComments) => {
    return Problem.update({_id: problemId}, {$inc: {comments: numberOfComments}}).exec();
}

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;

