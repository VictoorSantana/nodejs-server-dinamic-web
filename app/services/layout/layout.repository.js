const Sequelize = require('sequelize');
const db = require('../../config/connection');

const model = db.define('layouts', {
	id: {
		type: Sequelize.INTEGER(),
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING(60),
		allowNull: false,
	},
	plugins: {
		type: Sequelize.STRING(150),
		allowNull: false,
	},
}, { timestamps: true });

module.exports = model;