
const pluginRepository = require('./plugin.repository');
const { onlyNumbers, resume } = require('../../config/filter');

module.exports = {
	find: async function (query) {
		let exclude = [];
		let include = [];

		const { paginate, where } = resume(query, [
			{ key: 'id_plugin', colunm: 'id_plugin', op: '=' },
			{ key: 'id_args', colunm: 'id_args', op: '=' },
		]);

		return await pluginRepository
			.findAndCountAll({
				...paginate,
				attributes: { exclude, include },
				where
			});
	},

	findOne: async function (id) {
		let exclude = [];
		return await pluginRepository
			.findOne({
				where: { id: onlyNumbers(id) }
			});
	},

	create: async function (value) {
		return await pluginRepository
			.create(value);
	},

	update: async function (id, value) {
		await pluginRepository
			.update(value, {
				where: { id: onlyNumbers(id) }
			});
		return await this.findOne(id);
	},

	delete: async function (id) {
		return await pluginRepository
			.destroy({
				where: { id: onlyNumbers(id) }
			});
	}
}