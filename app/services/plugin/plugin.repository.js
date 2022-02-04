const Sequelize = require('sequelize');
const db = require('../../config/connection');

const model = db.define('plugins', {
	id: {
		type: Sequelize.INTEGER(),
		autoIncrement: true,
		primaryKey: true
	},
	id_plugin: {
		type: Sequelize.INTEGER(),
		allowNull: false,
	},
	id_args: {
		type: Sequelize.INTEGER(),
		allowNull: false,
		defaultValue: '0',
	},
	place: {
		type: Sequelize.STRING(20),
		allowNull: false,
		defaultValue: 'header',
	},
}, { timestamps: true });

module.exports = model;