import Problem from '../src/models/problem';
import Vote from '../src/models/vote';
import User from '../src/models/user';
import mongoose from 'mongoose';
import chai from 'chai';
chai.should();
mongoose.Promise = global.Promise;

class TestManager {
    static connectToDatabase(done) {                  
        if (mongoose.connection.readyState == 0) {
            mongoose.connect("mongodb://localhost:27017/problem_hunter", () => {  
                done();              
            });
        }    
        else {            
            done();
        }    
    }

    static initializeDemoData(numberOfProblems = 10) {        
        let problems = [];
        for (let x = 0; x < numberOfProblems; x++){
            let newProblem = new Problem();
            newProblem.title = `This is a title ${x}`;
            newProblem.description = `This is the description ${x}`;
            newProblem.upvotes = 0;
            newProblem.comments = 0;

            problems.push(newProblem.save());
        }

        return Promise.all(problems);
    }

    static cleanDatabase() {
        return Promise.all([Vote.remove({}),Problem.remove({}), User.remove({})]);
    }
}

export default TestManager;
