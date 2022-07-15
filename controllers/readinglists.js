const router = require('express').Router()
const { Readlist } = require('../models')
const { tokenExtractor } = require('../util/middleware')


router.get('/', async (req, res) => {
    const list = await Readlist.findAll({})
    res.json(list)
})

router.post('/', tokenExtractor, async (req, res) => {
    const { blogId } = req.body
    const userId = req.decodedToken.id
    const list = await Readlist.create({ blogId, userId })

    res.json(list)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    console.log(req.decodedToken.id)
    const { id } = req.params
    const { read } = req.body
    if (req.decodedToken.id === id) {
        const list = await Readlist.findByPk(id)
        if (list) {
            list.set({ read })
            list.save()
            res.json(list)
        } else {
            res.status(404).json({ error: "list not found" })
        }
    } else {
        res.status(401).json({ error: "unauthorized" })
    }
})


module.exports = router