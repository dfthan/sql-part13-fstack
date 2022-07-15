const Blog = require('./blog')
const User = require('./user')
const Readlist = require('./readlist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readlist, as: "readings" })
Blog.hasMany(Readlist)

module.exports = {
    Blog, User, Readlist
}