const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: async ({ userInput }) => {
        let hashedPassword = await bcrypt.hash(userInput.password, 8)
        const user = new User({
            email: userInput.email,
            password: hashedPassword
        })

        return user.save().then(u => {
            return { ...u._doc, _id: u.id }
        }).catch(err => {
            console.log(err)
            throw err
        })
    },
    login: async ({ email, password }, req) => {
        if (!email || !password) {
            throw new Error('Email and password are required fields')
        }

        user = await User.findOne({ email: email })

        if (!user) {
            throw new Error('Authentication Failed')
        }

        const isEqual = await bcrypt.compare(password, user.password)

        if (!isEqual) {
            throw new Error('Authentication Failed')
        }


        const token = await jwt.sign({
            userId: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: '2 days' })

        req.userId = user.id
        req.isAuth = true

        return {
            ...user._doc,
            token: token,
            expiresIn: '2 days'
        }
    }
}