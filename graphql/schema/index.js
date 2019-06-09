const { buildSchema } = require('graphql')



module.exports = buildSchema(`
type Booking {
    _id: ID!
    todo: Todo!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type AuthData {
    _id: ID!
    email: String!
    token: String!
    expiresIn: String!
}

type Todo {
    _id: ID!
    title: String!
    notes: String!
    completed: Boolean!
    description: String!
    createdAt: String!
    updatedAt: String
    creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdTodos: [Todo!]
}

input createUserInput {
    email: String!
    password: String!
}

input TodoInput {
    title: String!
    notes: String!
    description: String!
}

type rootQuery {
    todos: [Todo!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type rootMutation {
    createTodo(todoInput: TodoInput!): Todo
    createUser(userInput: createUserInput!): User!
    bookTodo(todoId: ID!): Booking!
    cancelBooking(bookingId: ID!): Todo!
    deleteTodo(todoId: ID!): Todo!
}

schema {
    query: rootQuery 
    mutation: rootMutation
}
`)