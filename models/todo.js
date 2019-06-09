const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
        timestamps: true
    })

module.exports = mongoose.model('todo', todoSchema)