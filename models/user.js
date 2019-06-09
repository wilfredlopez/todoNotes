const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdTodos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'todo'
        }
    ]
})

module.exports = mongoose.model('user', userSchema)