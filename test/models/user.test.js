import Problem from '../../src/models/problem';
import Vote from '../../src/models/vote';
import User from '../../src/models/user';
import TestManager from '../test_manager';
import mongoose from 'mongoose';
import chai from 'chai';
let assert = require('chai').assert
chai.should();
mongoose.Promise = global.Promise;

describe('User', () => {
    before((done) => {
        TestManager.connectToDatabase(done);
    });

    describe ('Testing validation on User', () => {
        it ('User with invalid email address will have a validation error', (done) => {
            let newUser = new User();

            newUser.email = "testtest.com";

            newUser.validate((error) => {                                                                
                assert(error.errors.email !== null, "error is not null");                
                done();
            });
        })
    })

    describe ('Testing validation on User', () => {
        it ('User with a valid email address should be valid', (done) => {
            let newUser = new User();

            newUser.email = "test@test.com";

            newUser.validate((error) => {                                                                                
                assert(error == null || error.errors.email == undefined, "User model has an email validation error");                
                done();
            });
        })
    })
});