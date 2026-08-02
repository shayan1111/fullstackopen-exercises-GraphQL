import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        author {
          name
        }
        published
        genres
    }
}
`

export const ALL_GENRES = gql`
query {
  bookGenres
}
`

export const FAVORITE_GENRE = gql`
query {
  favoriteGenre
}
`

export const ADD_BOOK = gql`
mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
        title
        author {
          name
        }
        published
        genres
    }
}
`

export const ADD_BIRTHYEAR = gql`
mutation addBirthyear(
    $name: String!
    $born: Int!
) {
    editAuthor(name: $name, setBornTo: $born) {
        name
        born
    }
}
`

export const LOGIN_USER = gql`
mutation login(
  $username: String!
  $password: String!
) {
  login(username: $username, password: $password) {
    value
  }
}
`