const Sequelize = require('sequelize');
const db = require('../../config/connection');
const model = db.define('auths', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER(),
        allowNull: false
    },
    role: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
}, { timestamps: false });

module.exports = model;