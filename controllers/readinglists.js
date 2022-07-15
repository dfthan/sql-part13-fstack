const router = require('express').Router()
const { Readlist } = require('../models')


router.get('/', async (req, res) => {
    const list = await Readlist.findAll({})
    res.json(list)
})

router.post('/', async (req, res) => {
    const { blogId, userId } = req.body
    const list = await Readlist.create({ blogId, userId })

    res.json(list)
})


module.exports = router