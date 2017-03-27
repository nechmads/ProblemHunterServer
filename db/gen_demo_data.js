import Problem from '../src/models/problem';
import Vote from '../src/models/vote';
import User from '../src/models/user';

import mongoose from 'mongoose';
import Faker from 'faker';

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/problem_hunter", () => {});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function cleanDatabase() {
    return Promise.all([Vote.remove({}),Problem.remove({}), User.remove({})]);
}

function createUsers() {
    let promisses  = [];
    for (let index = 0; index < 10; index++) {
        let newUser = new User();        
        newUser.email = Faker.internet.email();
        newUser.firstName = Faker.name.firstName();
        newUser.lastName = Faker.name.lastName();
        newUser.password = Faker.internet.password();
        newUser.apiKey = Faker.random.uuid();
                
        promisses.push(newUser.save());        
    }

    return Promise.all(promisses);
}

function createProblems() {        
    return User.find({}).then((users) => {    
        let promisses  = [];

        for (let userIndex = 0; userIndex < 10; userIndex++) {
            console.log(userIndex);
            if (userIndex % 2 === 0) {
                const numberOfProblemsToCreate = getRandomInt(1, 10);
                for (let problemIndex = 1; problemIndex < numberOfProblemsToCreate; problemIndex++) {
                    let newProblem = new Problem();
                    newProblem.title = Faker.lorem.sentence();
                    newProblem.description = Faker.lorem.paragraph();

                    promisses.push(newProblem.save());                    
                }
            }
        }
        
        return Promise.all(promisses);
    })        
}

cleanDatabase().then(createUsers).then(createProblems).then(() => {console.log("end")});





