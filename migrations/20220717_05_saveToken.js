const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('sessions', 'token', {
            type: DataTypes.STRING,
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('sessions', 'token');
    }
}