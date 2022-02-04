
const sectionRepository = require('./section.repository');
const { onlyNumbers, resume } = require('../../config/filter');

module.exports = {
	find: async function (query) {
		let exclude = [];
		let include = [];

		const { paginate, where } = resume(query, [
			{ key: 'id_layout', colunm: 'id_layout', op: '=' },
			{ key: 'id_section', colunm: 'id_section', op: '=' },
			{ key: 'title', colunm: 'title', op: 'like%' },
			{ key: 'description', colunm: 'description', op: 'like%' },
			{ key: 'display', colunm: 'display', op: '=' },
		]);

		return await sectionRepository
			.findAndCountAll({
				...paginate,
				attributes: { exclude, include },
				where
			});
	},

	findOne: async function (id) {
		let exclude = [];
		return await sectionRepository
			.findOne({
				where: { id: onlyNumbers(id) }
			});
	},

	create: async function (value) {
		return await sectionRepository
			.create(value);
	},

	update: async function (id, value) {
		await sectionRepository
			.update(value, {
				where: { id: onlyNumbers(id) }
			});
		return await this.findOne(id);
	},

	delete: async function (id) {
		return await sectionRepository
			.destroy({
				where: { id: onlyNumbers(id) }
			});
	}
}