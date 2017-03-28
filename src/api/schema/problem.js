import User from './user';

const Problem = `
    type Problem {
        id: String!
        title: String!
        description: String!
        upvotes: Int!,
        user: User      
    }
`;

export default () => [Problem, User];

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

const Problem = new GraphQLObjectType({
    name: 'Problem',
    description: 'Represent a problem that a user posted into the system',
    fields: () => ({
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        upvotes: {type: GraphQLInt},
        user: {type: User},
        createdAt: {type: GraphQLString},   
        updatedAt: {type: GraphQLString}
    })
});

export default Problem;*/