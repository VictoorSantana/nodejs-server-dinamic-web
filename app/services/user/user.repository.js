const Sequelize = require('sequelize');
const db = require('../../config/connection');
const model = db.define('users', {
    id: {
        type: Sequelize.INTEGER(),
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE(),
    }
}, { timestamps: false });

module.exports = model;