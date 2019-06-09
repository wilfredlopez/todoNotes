const Todo = require('../../models/todo')
const Booking = require('../../models/booking')

const { transformTodo, transformBooking } = require('./dataLoader')


module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        try {

            const bookings = await Booking.find({ user: req.userId })
            return bookings.map(booking => {
                return transformBooking(booking)
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    bookTodo: async ({ todoId }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        const todo = await Todo.findOne({ _id: todoId })

        //verify if booking already there
        const isBooked = await Booking.find({ todo: todoId, user: req.userId })
        const booking = new Booking({
            user: req.userId,
            todo: todo
        })

        if (isBooked.length !== 0) {
            return isBooked[0]
        }

        const result = await booking.save()
        return transformBooking(result)
    },
    cancelBooking: async ({ bookingId }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        try {
            const booking = await Booking.findById({ _id: bookingId }).populate('todo')
            const todo = transformTodo(booking.todo)
            await Booking.deleteOne({ _id: bookingId })
            return todo
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}