
const todos = require('./todos')
const users = require('./users')
const bookings = require('./bookings')




module.exports = {
    ...todos,
    ...users,
    ...bookings
}

