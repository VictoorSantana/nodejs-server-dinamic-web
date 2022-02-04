const Sequelize = require('sequelize');
const db = require('../../config/connection');
const model = db.define('files', {
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
    },
    extension: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
    type: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
}, { timestamps: true });

module.exports = model;