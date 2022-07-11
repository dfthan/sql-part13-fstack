require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

class Blog extends Sequelize.Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    sequelize,
    modelName: 'blogs',
    underscored: true,
    timestamps: false
})

Blog.sync()

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        res.json(blogs)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

app.post("/api/blogs", async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        res.status(201).json(blog)
    } catch (error) {
        console.error(error)
        res.status(400).send('Bad request')
    }
})

app.delete("/api/blogs/:id", async (req, res) => {
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


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})