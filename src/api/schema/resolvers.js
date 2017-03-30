import ProblemsController from '../../controllers/problems';
import UserController from '../../controllers/users';

const resolveFunctions = {
    Query: {
        problems(_, { start, limit }) {
            return ProblemsController.getProblems(start, limit).then((results) => {
                return results;
            });
        }
    },
    Problem : {
        user(problem) {
            return UserController.getUser(problem.user);
        }
    }    
};

export default resolveFunctions;