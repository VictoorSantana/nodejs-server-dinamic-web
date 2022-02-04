
const folderRepository = require('./folder.repository');
const { onlyNumbers, resume } = require('../../config/filter');

module.exports = {
    find: async function (query) {
        let exclude = [];
        let include = [];

        const { paginate } = resume(query, []);

        return await folderRepository
            .findAndCountAll({
                ...paginate,
                attributes: { exclude, include }
            });
    },

    findOne: async function (id) {
        let exclude = [];
        return await folderRepository
            .findOne({
                where: { id: onlyNumbers(id) }
            });
    },

    create: async function (value) {
        return await folderRepository
            .create(value);
    },

    update: async function (id, value) {
        await folderRepository
            .update(value, {
                where: { id: onlyNumbers(id) }
            });
        return await this.findOne(id);
    },

    delete: async function (id) {
        return await folderRepository
            .destroy({
                where: { id: onlyNumbers(id) }
            });
    }
}