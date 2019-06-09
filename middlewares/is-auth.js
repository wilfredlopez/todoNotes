const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    //expected headers: {Authorization: 'Bearer thisIsMyTokenINFO'}
    const authHeader = req.get('Authorization')


    if (!authHeader) {
        req.isAuth = false
        return next()
    }

    const token = await req.headers.authorization.split(' ')[1]

    if (!token || token === '') {
        req.isAuth = false
        return next()
    }

    let decodedToken = false
    try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        req.isAuth = false
        return next()
    }

    req.isAuth = true
    req.userId = decodedToken.userId
    next()

}