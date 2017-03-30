import Problem from '../models/problem';
import User from '../models/user';


class UsersController {
    /**
     * 
     * @param {String} userId - The id of the user we ant to fetch
     * @return {Promise.<User, Error>} A promise holding a user object if no error, otherwise rejected with an error
     */
    static getUser(userId) {
        return User.findById(userId);
    }

    /**
     * 
     * @param {String} userId - The user id we want to egt the problems for
     * @return {Promise.<Array, Error>} A promise holding a an array of the problems the user own
     */
    static getProblems(userId) {
        return Problem.find({user: userId});
    }
}

export default UsersController;