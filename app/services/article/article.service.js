
const articleRepository = require('./article.repository');
const fileRepository = require('../file/file.repository');
const { onlyNumbers, resume, clone } = require('../../config/filter');
const storage = require('../../config/storage');

module.exports = {
	find: async function (query) {
		let exclude = [];
		let include = [];

		const { paginate, where } = resume(query, [
			{ key: 'id_layout', colunm: 'id_layout', op: '=' },
			{ key: 'id_cover_image', colunm: 'id_cover_image', op: '=' },
			{ key: 'id_section', colunm: 'id_section', op: '=' },
			{ key: 'short', colunm: 'short', op: 'like%' },
			{ key: 'title', colunm: 'title', op: 'like%' },
			{ key: 'complement', colunm: 'complement', op: 'like%' },
			{ key: 'content', colunm: 'content', op: 'like%' },
		]);

		return await articleRepository
			.findAndCountAll({
				...paginate,
				attributes: { exclude, include },
				where
			});
	},

	findOne: async function (id) {
		let exclude = [];
		return await articleRepository
			.findOne({
				where: { id: onlyNumbers(id) }
			});
	},

	create: async function (value) {
		return await articleRepository
			.create(value);
	},

	createFull: async function (value, files) {
		if (files) {
			if (!files['stream']) {
				throw new Error('Não foi encontrado arquivo dentro do "stream".');
			}
		} else {
			throw new Error('Adicione um arquivo na propriedade "stream" antes de enviar.');
		}

		const filesResult = storage.several([files['stream']]);
		const file = filesResult[0];
		const fileResponse = await fileRepository
			.create({
				...value,
				...file,
			});

		const newFileCreated = clone(fileResponse);

		return await articleRepository
			.create({
				...value,
				id_cover_image: newFileCreated.id
			});
	},

	update: async function (id, value) {
		await articleRepository
			.update(value, {
				where: { id: onlyNumbers(id) }
			});
		return await this.findOne(id);
	},

	delete: async function (id) {
		return await articleRepository
			.destroy({
				where: { id: onlyNumbers(id) }
			});
	}
}