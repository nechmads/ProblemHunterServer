import Problem from '../src/models/problem';
import Vote from '../src/models/vote';
import User from '../src/models/user';
import mongoose from 'mongoose';
import Faker from 'faker';
import chai from 'chai';
chai.should();
mongoose.Promise = global.Promise;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

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
        for (let x = 0; x < numberOfProblems; x++) {
            let newProblem = new Problem();
            newProblem.title = `This is a title ${x}`;
            newProblem.description = `This is the description ${x}`;
            newProblem.upvotes = 0;
            newProblem.comments = 0;

            problems.push(newProblem.save());
        }

        return Promise.all(problems);
    }

    static initializeAllDemoData(numberOfProblems = 10) {
        return TestManager.createUsers().then((users) => {
            let problemsPromisses = [];
            for (let userIndex = 0; userIndex < users.length; userIndex++) {
                let numberOfProblems = getRandomInt(1, 4);
                for (let problemIndex = 0; problemIndex < numberOfProblems; problemIndex++) {
                    problemsPromisses.push(...TestManager.createProblem(users[userIndex]));
                }
            }

            return Promise.all(problemsPromisses);
        }).catch((error) => {
            console.log(error);
        })
    }

    static cleanDatabase() {
        return Promise.all([Vote.remove({}), Problem.remove({}), User.remove({})]);
    }

    static createUsers(numberOfUsers = 10) {
        let promisses = [];
        for (let index = 0; index < numberOfUsers; index++) {
            let newUser = new User();
            newUser.email = Faker.internet.email();
            newUser.firstName = Faker.name.firstName();
            newUser.lastName = Faker.name.lastName();
            newUser.facebookId = Faker.internet.userName();
            newUser.password = Faker.internet.password();
            newUser.apiKey = Faker.random.uuid();

            promisses.push(newUser.save());
        }

        return Promise.all(promisses);
    }

    static createProblems(postingUser = null, numberOfProblems = 1) {
        let problems = [];
        for (let index = 0; index < numberOfProblems; index++){
            let newProblem = new Problem();
            newProblem.title = Faker.lorem.sentence();
            newProblem.description = Faker.lorem.paragraph();
            if (postingUser != null) newProblem.user = postingUser;

            problems.push(newProblem.save());
        }
        

        return Promise.all(problems);
    }
}

export default TestManager;
