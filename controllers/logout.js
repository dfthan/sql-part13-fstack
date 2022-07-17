const router = require('express').Router();
const Session = require('../models/session');

router.delete('/', async (request, response) => {
    const { userId } = request.body;
    await Session.destroy({
        where: {
            userId,

        }
    })
    response.status(204).end()
})

module.exports = router