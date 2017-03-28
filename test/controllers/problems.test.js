import Problem from '../../src/models/problem';
import Vote from '../../src/models/vote';
import ProblemsController from '../../src/controllers/problems';
import TestManager from '../test_manager';
import mongoose from 'mongoose';
import Faker from 'faker';
import chai from 'chai';
chai.should();
mongoose.Promise = global.Promise;

describe('Problems Controller', () => {    
    before((done) => {        
        TestManager.connectToDatabase(done);
    });

    describe('addProblem', () => {
        before((done) => {
            TestManager.cleanDatabase().then(() => {done()});        
        })    

        after((done) => {
            TestManager.cleanDatabase().then(() => {done()});        
        })

        it('should add a problem and return it', (done) => {   
            let title = Faker.lorem.sentence();
            let description = Faker.lorem.paragraph();
            ProblemsController.addProblem(null, title, description).then((user) => {
                user.title.should.equal(title);
                user.description.should.equal(description);
                done();
            }).catch((error) => {                
                done(error);
            })
        })
    }) 

    describe('upvoteProblem', () => {
        beforeEach((done) => {
            TestManager.initializeDemoData().then(() => {done()});
        });

        after((done) => {
            TestManager.cleanDatabase().then(() => {done()});        
        })

        it ('should add 1 vote to the problem', (done) => {
            Problem.find({}).limit(1).then((results) => {
                let problemId = results[0]._id;
                let initialNumberOfVotes = results[0].upvotes;

                ProblemsController.upvoteProblem(problemId, null).then(() => {
                    Problem.findById(problemId).then((problem) => {
                        problem.upvotes.should.equal(initialNumberOfVotes + 1);
                        done();
                    });
                });
            });
        });
    });

    describe('getProblem', () => {
        let specificProblem;

        before((done) => {
            TestManager.cleanDatabase().then(() => {
                let newProblem = new Problem();
                newProblem.title = Faker.lorem.sentence();
                newProblem.description = Faker.lorem.paragraph();
                newProblem.upvotes = 0;
                newProblem.comments = 0;    

                newProblem.save().then((result) => {
                    specificProblem = result;                    
                    done();
                });
            });                            
            
        })    

        after((done) => {
            TestManager.cleanDatabase().then(() => {done()});        
        })

        it('should return just the problem requested', (done) => {
            ProblemsController.getProblem(specificProblem._id).then((result) => {
                result._id.toString().should.equal(specificProblem._id.toString());
                done();
            })
        })
    });

    describe('getProblems', () => {
        let problems = [];    
        before((done) => {                               
            for (let x = 0; x < 150; x++){
                let newProblem = new Problem();
                newProblem.title = `This is a title ${x}`;
                newProblem.description = `This is the description ${x}`;
                newProblem.upvotes = 0;
                newProblem.comments = 0;

                problems.push(newProblem.save());
            }

            Promise.all(problems).then((result) => {                
                problems = result.slice(0, 100);
                done();                                
            });
        })

        after((done) => {
            TestManager.cleanDatabase().then(() => {done()});        
        })

        it('should get back exactly 100 problems by default', (done) => {
            ProblemsController.getProblems().then((results) => {                 
                results.length.should.equal(problems.length);
                done();                                
            })
        });

        it('should return the first 100 results ordered by creation date', (done) => {
             ProblemsController.getProblems().then((results) => { 
                let lastResult = results[0];
                
                for (let index = 1; index < results.length; index++){
                    if (results[index].createdAt < lastResult.createdAt) {
                        done(new Error(`result in index ${index} is created before the last result`))
                        return;
                    }

                    lastResult = results[index];                    
                }

                done();                                
            })
        }) 

        it('should get back the exact number of problems requested', (done) => {
            ProblemsController.getProblems(null, 30).then((results) => {                 
                results.length.should.equal(30);
                done();                                
            })
        });

        it('should return the next 20 results', (done) => {
            let allResults;
            ProblemsController.getProblems(null, 40).then((results) => {    
                allResults = results;

                ProblemsController.getProblems(allResults[19]._id.toString(), 20).then((results) => {
                    for (let index = 0; index < results.length; index++) {
                        allResults[20+index]._id.toString().should.equal(results[index]._id.toString());                        
                    }

                    done();
                })
            });
        })
    })
});