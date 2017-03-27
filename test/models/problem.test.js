import Problem from '../../src/models/problem';
import Vote from '../../src/models/vote';
import TestManager from '../test_manager';
import mongoose from 'mongoose';
import chai from 'chai';
chai.should();
mongoose.Promise = global.Promise;



describe('Problem', () => {    
    before((done) => {        
        TestManager.connectToDatabase(done);
    });

    describe('creating a new problem', () => {
        let newProblem;

        beforeEach(() => { 
            newProblem = new Problem();
        });

        it('has a default comments of 0', () => {
            newProblem.comments.should.equal(0);            
        });

        it('has a default upvotes of 0', () => {
            newProblem.upvotes.should.equal(0);            
        });        
    });

    describe('saving a new problem', () => {
        let newProblem;

        beforeEach(() => {             
            newProblem = new Problem();
        });

        afterEach((done) => {
            TestManager.cleanDatabase().then(() => {
                done();
            });
        })

        it('saves a valid problem to the database', () => {
            newProblem = new Problem();
            newProblem.title = "this is a title";
            newProblem.description = "this is a description";                   
            return newProblem.save() ;                         
        });

        it('fails to save a problem without description to the database', (done) => {
            newProblem = new Problem();
            newProblem.title = "this is a title";                             
            newProblem.save().then(() => {
                done(new Error());
            }).catch((err) => {
                done();
            })
        });

        it('fails to save a problem without title to the database', (done) => {
            newProblem = new Problem();            
            newProblem.description = "this is a description";                                                
            newProblem.save().then(() => {
                done(new Error());
            }).catch((err) => {
                done();
            })
        });
    });
});

