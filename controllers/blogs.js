const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post("/", async (req, res) => {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
})

router.put("/:id", blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json({
        likes: req.blog.likes
    })
})

router.delete("/:id", async (req, res) => {
    const blog = await Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(`Deleted blog with id ${req.params.id} succesfully`)
})


module.exports = router