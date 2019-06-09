const express = require('express')
const bodyParser = require('body-parser')
const graphQlHttp = require('express-graphql')

const mongoose = require('mongoose')
const app = express()
const isAuth = require('./middlewares/is-auth')


const graphqlSchema = require('./graphql/schema/index')
const resolvers = require('./graphql/resolvers/index')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    }
    next();
})


app.use(isAuth)

app.use('/graphql', graphQlHttp({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: true
}))
//TEST ROUTE
app.get('/', (req, res) => {
    res.json({ welcome: 'Welcome to the API' })
})


const port = process.env.PORT || 5000

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ef6nu.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    app.listen(port, () => {
        console.log(`'Listening on port' ${port}`)
    })
}).catch(err => {
    console.log(err)
})

