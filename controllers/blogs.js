const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        res.json(blogs)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

router.post("/", async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        res.status(201).json(blog)
    } catch (error) {
        console.error(error)
        res.status(400).send('Bad request')
    }
})

router.put("/:id", blogFinder, async (req, res) => {
    try {
        if (req.blog) {
            req.blog.likes = req.body.likes
            await req.blog.save()
            res.json({
                likes: req.blog.likes
            })
        } else {
            res.status(404).send('Blog not found')
        }
    } catch (error) {
        console.error(error)
        res.status(400).send('Bad request')
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const blog = await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send(`Deleted blog with id ${req.params.id} succesfully`)
    } catch (error) {
        console.error(error)
        res.status(400).send('Bad request')
    }
})


module.exports = router