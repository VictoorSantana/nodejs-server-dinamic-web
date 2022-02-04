const Sequelize = require('sequelize');
const db = require('../../config/connection');

const model = db.define('articles', {
	id: {
		type: Sequelize.INTEGER(),
		autoIncrement: true,
		primaryKey: true
	},
	id_layout: {
		type: Sequelize.INTEGER(),
		allowNull: false,
	},
	id_cover_image: {
		type: Sequelize.INTEGER(),
		allowNull: false,
	},
	id_section: {
		type: Sequelize.INTEGER(),
		allowNull: false,
		defaultValue: '0',
	},
	short: {
		type: Sequelize.STRING(130),
		allowNull: true,
	},
	title: {
		type: Sequelize.STRING(200),
		allowNull: false,
	},
	complement: {
		type: Sequelize.STRING(200),
		allowNull: false,
	},
	content: {
		type: Sequelize.STRING(2000),
		allowNull: false,
	},
}, { timestamps: true });

module.exports = model;