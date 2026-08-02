const typeDefs = /* GraphQL */ `
type User {
username: String!
favoriteGenre: String!
id: ID!
}

type Token {
value: String!
}

type Book {
  title: String!
  author: Author!
  published: Int!
  genres: [String!]!
  id: ID!
}

type Author {
  name: String!,
  bookCount: Int!,
  born: Int,
  id: ID!
}

type Mutation {
  _resetDatabase: Boolean

  addBook(
    title: String!,
    author: String!,
    published: Int!,
    genres: [String!]!
  ) : Book

  editAuthor(name: String!, setBornTo: Int!) : Author
  
  createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
}

type Query {
  me: User
  bookCount: Int!,
  authorCount: Int!,
  allBooks(author: String, genre: String): [Book!]!,
  allAuthors: [Author!]!,
  bookGenres: [String!]!
  favoriteGenre: String
}
`

module.exports = typeDefs