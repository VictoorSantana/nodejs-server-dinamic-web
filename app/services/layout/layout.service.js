
const layoutRepository = require('./layout.repository');
const { onlyNumbers, resume } = require('../../config/filter');

module.exports = {
	find: async function (query) {
		let exclude = [];
		let include = [];

		const { paginate, where } = resume(query, [
			{ key: 'name', colunm: 'name', op: 'like%' },
			{ key: 'plugins', colunm: 'plugins', op: 'like%' },
		]);

		return await layoutRepository
			.findAndCountAll({
				...paginate,
				attributes: { exclude, include },
				where
			});
	},

	findOne: async function (id) {
		let exclude = [];
		return await layoutRepository
			.findOne({
				where: { id: onlyNumbers(id) }
			});
	},

	create: async function (value) {
		return await layoutRepository
			.create(value);
	},

	update: async function (id, value) {
		await layoutRepository
			.update(value, {
				where: { id: onlyNumbers(id) }
			});
		return await this.findOne(id);
	},

	delete: async function (id) {
		return await layoutRepository
			.destroy({
				where: { id: onlyNumbers(id) }
			});
	}
}