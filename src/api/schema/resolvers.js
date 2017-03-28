import ProblemsController from '../../controllers/problems'

const resolveFunctions = {
    Query: {
        problems() {
            return ProblemsController.getProblems().then((results) => {
                return results;
            });
        }
    }
};

export default resolveFunctions;