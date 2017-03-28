"use strict"

import Problem from '../models/problem';
import Vote from '../models/vote';
import Comment from '../models/comment';
import moment from 'moment';

class ProblemsController {
    /**
     * 
     * @param {string} userId - The user id that is adding the problem
     * @param {string} title - The title of the problem
     * @param {string} description - The description of the problem
     */    
    static addProblem(userId, title, description) {
        const newProblem = new Problem();
        newProblem.title = title;
        newProblem.description = description;
        newProblem.user = userId;

        return newProblem.save();
    }

    /**
     * Upvoting the problem by one vote
     * @param {string} problemId - The id of the problem to upvote
     * @param {string} userId - The id of the user making the vote
     */
    static upvoteProblem(problemId, userId) {
        const newVote = new Vote();
        newVote.user = userId;
        newVote.problem = problemId;

        return newVote.save();
    }

    /**
     * Adding a comment to a problem
     * @param {string} problemId - The id of the problem to comment on
     * @param {*} userId - The id of the user making the comment
     * @param {*} description - the comment body
     */
    static addComment(problemId, userId, description) {
        const newComment = new Comment();
        newComment.problem = problemId;
        newComment.user = userId;
        newComment.details = description;

        return newComment.save();
    }

    /*static getProblems(start = "01/01/1970", limit = 100) {
        return Problem.find({createdAt: {$gt: moment(start, 'MM/DD/YYYY').toDate()}}).limit(limit).sort({_id : 1});
    }*/

    static getProblems(start = null, limit = 100) {
        if (start == null || start == ""){
            return Problem.find({}).limit(limit).sort({_id : 1});
        }
        else {
            return Problem.find({_id: {$gt: start}}).limit(limit).sort({_id : 1});
        }        
    }

    static getProblem(problemId) {
        return Problem.findById(problemId);
    }
}

export default ProblemsController;