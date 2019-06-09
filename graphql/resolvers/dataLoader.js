const DataLoader = require('dataloader')
const Todo = require('../../models/todo')
const User = require('../../models/user')

const userLoader = new DataLoader(async (userIds) => {
    return User.find({ _id: { $in: userIds } })
})

const todoLoader = new DataLoader((todoIds) => {
    return getTodos(todoIds)
})

const transformTodo = (todo) => {
    return {
        ...todo._doc,
        _id: todo.id,
        createdAt: new Date(todo._doc.createdAt).toISOString(),
        creator: getUser.bind(this, todo._doc.creator)
    }
}


const getTodos = async (todoIds) => {
    try {
        const todos = await Todo.find({ _id: { $in: todoIds } })
        return todos.map(todo => {
            return transformTodo(todo)
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getUser = async (id) => {
    try {
        const user = await userLoader.load(id.toString())
        return { ...user._doc, _id: user.id, createdTodos: () => todoLoader.loadMany(user._doc.createdTodos) }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getOneTodo = async (todoId) => {
    try {
        // const todo = await Todo.findById(todoId)
        const todo = await todoLoader.load(todoId.toString())
        // return transformTodo(todo)
        return todo
    } catch (error) {
        console.log(error)
        throw error
    }
}
const transformBooking = booking => {
    return {
        ...booking._doc,
        todo: () => getOneTodo(booking._doc.todo),
        user: () => getUser(booking._doc.user),
        _id: booking.id,
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
    }
}

module.exports = { todoLoader, userLoader, getUser, getTodos, transformTodo, getOneTodo, transformBooking } 