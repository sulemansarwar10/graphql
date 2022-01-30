//const { PubSub } = require('graphql-subscriptions');
const { ApolloServer, gql } = require('apollo-server');

//const pubsub = new PubSub();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Student" type defines the queryable fields for every book in our data source.
  type Student {
    id: Int
    name: String
    email: String
    age: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Student (defined above).
  type Query {
    students: [Student]
  }
  type Mutation {
    addStudent(name: String!, email: String!, age: Int!): Student!
    updateUser(id: Int!, name: String, email: String, age: Int): Student!
  }
#  type Subscription {
#   userCreated: Student!
#  }

`;
const student = [
    {
        id: 1,
        name: 'suleman',
        email: 'suleman@gmail.com',
        age: 18,
    },
    {
        id: 2,
        name: 'ali',
        email: 'ali@gmail.com',
        age: 15,
    },
    {
        id: 3,
        name: 'qasim',
        email: 'qasim@gmail.com',
        age: 19,
    },
];
const NEW_USER = "NEW_USER"
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        students: () => student,
    },
    Mutation: {
        addStudent: (parent, { name, email, age }) => {
            const id = student.length + 1;
            const newstd = {
                id,
                name,
                email,
                age
            }
         //   pubsub.publish(NEW_USER, { userCreated:newstd });
            student.push(newstd)
            return student[student.findIndex(obj => obj.id === id)];
        },
        updateUser: (parent, { id, name, email, age }) => {
            const objind = student.findIndex((obj => obj.id == id))
            
            if (name) { student[objind].name = name; }
            if (email) { student[objind].email = email; }
            if (age) { student[objind].age = age; }

            return student[objind];
        }
    },
    // Subscription: {
    //     userCreated: {
    //         subscribe: () => pubsub.asyncIterator(NEW_USER)
    //     }
    // },



};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
