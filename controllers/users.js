const router = require('express').Router()
const { Op } = require('sequelize')

const { User, Readlist } = require('../models')
const { Blog } = require('../models')


router.get("/", async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    res.json(users)
})

router.get("/:id", async (req, res) => {
    const where = {}
    if (req.query.read) {
        where.read = req.query.read
    }

    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', "updatedAt", "id"] },
        include: [
            {
                model: Blog,
                as: "readings",
                attributes: { exclude: ['userId', "createdAt", "updatedAt"] },
                through: {
                    attributes: []
                },
                include: {
                    model: Readlist,
                    attributes: { exclude: ["createdAt", "updatedAt", "blogId", "userId"] },
                    where
                },

            },
        ],
    })
    res.json(user)
})

router.post("/", async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).json(user)
})

router.put("/:username", async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user) {
        user.set(req.body)
        user.save()
        res.json(user)
    } else {
        res.status(404).json({ error: "user not found" })
    }
})

module.exports = router