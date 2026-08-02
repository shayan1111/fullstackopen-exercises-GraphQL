const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')


const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser
    },

    bookGenres: async () => {
      const books = await Book.find({})

      const genresList = books.flatMap(book => book.genres)

      return [...new Set(genresList)]
    },

    favoriteGenre: (root, args, context) => {
      return context.currentUser.favoriteGenre
    },

    bookCount: async () => Book.collection.countDocuments(),

    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (!args.genre) return Book.find({}).populate('author')

      return Book.find({ genres: args.genre }).populate('author')
    },

    allAuthors: async () => Author.find({})

  },
  Author: {
    bookCount: async (author) => {
      return Book.countDocuments({
        author: author._id
      })
    }
  },

  Mutation: {
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode')
      }
      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    },

    createUser: async (root, args) => {
      try {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

        await user.save()

        return user
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) throw new GraphQLError('not authenticated', {
        extensions: {
          code: "UNAUTHENTICATED"
        }
      })

      try {
        // Find the author
        let author = await Author.findOne({ name: args.author })

        // If the author doesn't exist, create it
        if (!author) {
          author = new Author({
            name: args.author
          })

          await author.save()
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id
        })

        await book.save()

        await book.populate('author')

        return book
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args
          }
        })
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) throw new GraphQLError('not authenticated', {
        extensions: {
          code: "UNAUTHENTICATED"
        }
      })

      try {
        // First look and see if the author is in the list
        const foundAuthor = await Author.findOne({ name: args.name })

        // If it isn't, return null
        if (!foundAuthor) return null

        // If it exists, update it
        foundAuthor.born = args.setBornTo
        await foundAuthor.save()

        return foundAuthor
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args
          }
        })
      }
    }
  }
}

module.exports = resolvers