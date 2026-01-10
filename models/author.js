const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre(
    'deleteOne',
    { document: true, query: false },
    async function () {
        const books = await Book.countDocuments({ author: this._id })

        if (books > 0) {
            throw new Error('This author has books still')
        }
    }
)

module.exports = mongoose.model('Author', authorSchema)