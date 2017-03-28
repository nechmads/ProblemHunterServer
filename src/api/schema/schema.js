import Problem from './problem';
import Resolvers from './resolvers';
import {makeExecutableSchema} from 'graphql-tools';


const SchemaDefinition = `
    type Query {
        problems: [Problem]
    }
`;

export default makeExecutableSchema({
    typeDefs: [SchemaDefinition, Problem],
    resolvers: Resolvers
});

/*import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType
} from 'graphql';

import Problem from './problem';
import ProblemsController from '../../controllers/problems'

const Query = new GraphQLObjectType({
    name: 'ProblemsSchema',
    description: 'The root of the problems schema',
    fields: () => ({
        problems: {
            type: new GraphQLList(Problem),
            description: 'List of problems in the system',
            resolve: () => {
                return ProblemsController.getProblems().then((results) => {
                    return results;
                });
            }
        }
    })
});

const Schema = new GraphQLSchema({
  query: Query 
});

export default Schema;*/