const Session = require('../models/session.js')
const User = require('../models/user.js')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const session = await Session.findOne({ where: { token: authorization.substring(7) } })
        // dirty solution to check if disabled but works for now
        const user = await User.findByPk(session.userId)
        if (session && !user.disabled) {
            req.decodedToken = session
        } else {
            return res.status(401).json({ error: 'invalid token or user disabled' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

module.exports = { tokenExtractor }