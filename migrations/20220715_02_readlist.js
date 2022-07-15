const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface, Sequelize }) => {
        await queryInterface.createTable('readlists', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            read: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }


        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('readlists')
    }

}