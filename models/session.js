const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');
class Session extends Model { }
Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    token: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'session',
})

module.exports = Session;