const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog } = require('../models')
const { User } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7))
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

router.get('/', async (req, res) => {
    console.log(req.query)

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ["name"]
        },
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${req.query.search || ''}%` } },
                { author: { [Op.like]: `%${req.query.search || ''}%` } },
            ]
        },
        order: [
            ['likes', 'DESC']
        ]
    })
    res.json(blogs)
})

router.post("/", tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
    res.status(201).json(blog)
})

router.put("/:id", blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json({
        likes: req.blog.likes
    })
})

router.delete("/:id", tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.params.id)
    if (user.id === blog.userId) {
        blog.destroy()
        res.send(`Deleted blog with id ${req.params.id} succesfully`)
    } else {
        res.status(401).json({ error: 'user not authorized' })
    }
})


module.exports = router