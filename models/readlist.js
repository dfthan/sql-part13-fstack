const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Readlist extends Model { }

Readlist.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'readlist',
    timestamps: false,
    underscored: true
})

module.exports = Readlist