const jwt = require('jsonwebtoken')
const User = require('../db/models/user')

const auth = async (req,res,next) =>{
    try {
        const token = req.header('Authorization').split(' ')[1]
        const decode = jwt.verify(token,"?FDjvZ<Z5P=z8J2GSA8bL=JT*a")
        const user = await User.findOne({_id:decode._id, 'tokens.token':token})
        if (!user){throw new Error('Authotentication not working!')}
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(400).json('Authotentication not working!')
    }
}

module.exports = auth