import Problem from '../../src/models/problem';
import Vote from '../../src/models/vote';
import TestManager from '../test_manager';
import mongoose from 'mongoose';
import chai from 'chai';
chai.should();
mongoose.Promise = global.Promise;

describe('Vote', () => {
    before((done) => {
        TestManager.connectToDatabase(done);
    });

    describe('upvoting a problem', () => {
        let firstProblem;

        beforeEach((done) => {
            TestManager.initializeDemoData().then(() => {
                Problem.find({}).limit(1).then((results) => {
                    firstProblem = results[0];
                    done();
                }).catch((error) => {
                    console.log(error);
                    done(error);
                });
            });
        });

        afterEach((done) => {
            TestManager.cleanDatabase().then(() => {
                done();
            });
        })

        it('should save a new vote into the database', (done) => {
            let newVote = new Vote();
            newVote.problem = firstProblem;
            newVote.save().then(() => {
                done();
            }).catch((error) => {
                done(error);
            })
        })

        it('should increment upvotes on the problem model', (done) => {
            let newVote = new Vote();
            newVote.problem = firstProblem;
            const initialUpvotesCount = firstProblem.upvotes;

            newVote.save().then(() => {
                Problem.find({}).limit(1).then((results) => {
                    results[0].upvotes.should.equal(initialUpvotesCount + 1);
                    done();
                }).catch(done);
            })
        })
    });
});

