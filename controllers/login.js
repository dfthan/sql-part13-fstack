const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');
const router = require('express').Router();
const { SECRET } = require('../util/config');

router.post("/", async (request, response) => {
    const body = request.body
    const user = await User.findOne({
        where: {
            username: body.username
        }
    })
    const passwordCorrect = body.password === 'salainen'
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    if (user.disabled) {
        return response.status(401).json({ error: 'user disabled' })
    }

    const session = await Session.findOne({ where: { userId: user.id } })

    if (!session) {
        const userForToken = {
            username: user.username,
            id: user.id,
        }

        const token = jwt.sign(userForToken, SECRET)
        Session.create({
            token,
            userId: user.id
        })
        response
            .status(200)
            .send({ token, username: user.username, name: user.name })
    }
    response.status(200).send({ token: session.token })
})

module.exports = router