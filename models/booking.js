const mongoose = require('mongoose')
const Schema = mongoose.Schema


const bookingSchema = new Schema({
    todo: {
        type: Schema.Types.ObjectId,
        ref: 'todo'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
        timestamps: true
    })

module.exports = mongoose.model('booking', bookingSchema)