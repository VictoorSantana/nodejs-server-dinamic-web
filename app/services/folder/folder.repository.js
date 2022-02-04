const Sequelize = require('sequelize');
const db = require('../../config/connection');
const model = db.define('folders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    id_folder_parent: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        default: 0
    }
}, { timestamps: true });

module.exports = model;