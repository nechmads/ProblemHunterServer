import User from '../../src/models/user';
import UsersController from '../../src/controllers/users';
import TestManager from '../test_manager';
import mongoose from 'mongoose';
import Faker from 'faker';
import chai from 'chai';
mongoose.Promise = global.Promise;

describe ('Users Controller', () => {
    before((done) => {        
        TestManager.connectToDatabase(done);
    });

    describe('getUser', () => {
        let userId;
        before((done) => {
            TestManager.cleanDatabase().then(() => {
                TestManager.createUsers(1).then((users) => {
                    userId = users[0]._id;  
                    done();    
                 });
            });        
        })  

        after((done) => {
            TestManager.cleanDatabase().then(() => {done()});        
        })

        it ('should return one user', (done) => {                                      
            UsersController.getUser(userId).then((user) => {
                user._id.toString().should.equal(userId.toString());
                done();
            })         
        })        
    })

    describe('getProblems', () => {
        let userId;
        let numberOfProblems = 10;
        before((done) => {
            TestManager.cleanDatabase().then(() => {
                TestManager.createUsers(1).then((users) => {
                    userId = users[0]._id;  
                    TestManager.createProblems(userId, numberOfProblems).then(() => {
                        done();
                    });                    
                 });
            });        
        })  

        after((done) => {
            TestManager.cleanDatabase().then(() => {done()});        
        })

        it('should return just the problems of the user requested', (done) => {
            UsersController.getProblems(userId).then((problems) => {
                problems.forEach((currProblem) => {
                    currProblem.user.toString().should.equal(userId.toString());
                })

                done();
            })
        })

        it ('should return all the problems the user own', (done) => {
            UsersController.getProblems(userId).then((problems) => {
                problems.length.should.equal(numberOfProblems);

                done();
            })
        })
    })
});
