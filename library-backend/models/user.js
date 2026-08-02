const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
    },

    favoriteGenre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)