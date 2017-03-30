import User from './user';
import Problem from './problem';

const Vote = `
    type Vote {
        # The user who posted this vote
        user: User
        # The problem that the vote was voted on
        problem: Problem
    }
`;

export default () => [Vote, User, Problem];

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

import User from './user';
import Problem from './problem';

const Vote = new GraphQLObjectType({
    name: 'Vote',
    description: 'Represnet an upvote on a problem by a certain user',
    fields: () => ({
        _id: {type: GraphQLString},
        user: {type: User},
        problem: {type: Problem},
        createdAt: {type: GraphQLString},   
        updatedAt: {type: GraphQLString}
    })
})

export default Vote;*/