const User = `
    type User {
        # The user ID
        id: String!
        # The user email
        email: String!   
        # The user facebook id
        facebookId: String!
        # The user first name
        firstName: String!
        # The user last name
        lastName: String!
        # The problems owned by this user
        problems:[Problem]             
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

