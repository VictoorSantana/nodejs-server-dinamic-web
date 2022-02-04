const Sequelize = require('sequelize');
const db = require('../../config/connection');

const model = db.define('sections', {
	id: {
		type: Sequelize.INTEGER(),
		autoIncrement: true,
		primaryKey: true
	},
	id_layout: {
		type: Sequelize.INTEGER(),
		allowNull: false,
	},
	id_section: {
		type: Sequelize.INTEGER(),
		allowNull: false,
		defaultValue: '0',
	},
	title: {
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	display: {
		type: Sequelize.INTEGER(),
		allowNull: true,
		defaultValue: '1',
	},
}, { timestamps: true });

module.exports = model;