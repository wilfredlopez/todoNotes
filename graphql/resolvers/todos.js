const Todo = require('../../models/todo')
const User = require('../../models/user')
const Booking = require('../../models/booking')
const { transformTodo } = require('./dataLoader')


module.exports = {
    todos: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        return Todo.find({ creator: req.userId }).then(result => {
            return result.map(async (todo) => {
                return transformTodo(todo)
            })
        })
    },
    createTodo: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        const todo = {
            title: args.todoInput.title,
            description: args.todoInput.description,
            notes: args.todoInput.notes,
            creator: req.userId
        }
        const newTodo = new Todo({ ...todo })

        const user = await User.findById(todo.creator)
        user.createdTodos.push(newTodo)
        await user.save()

        return newTodo.save().then(result => {
            return transformTodo(result)
        }).catch(err => {
            console.log(err)
            throw err
        })
    },
    deleteTodo: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }

        try {
            const todo = await Todo.findById(args.todoId)
            //remove if booked
            await Booking.findOneAndDelete({ todo: args.todoId })
            await Todo.findByIdAndDelete(args.todoId)
            return todo
        } catch (err) {
            console.log(err)
            throw err
        }



    }
}