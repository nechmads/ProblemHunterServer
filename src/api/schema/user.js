const User = `
    type User {
        id: String!
        email: String!
        facebook_id: String!
        first_name: String!
        last_name: String!        
    }    
`;

export default User;


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

const User = new GraphQLObjectType({
    name: 'User',
    description: 'Represent an end user in the system',
    fields: () => ({
        _id: {type: GraphQLString},
        email: {type: GraphQLString},
        facebook_id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString}
    })
});

export default User;
*/

