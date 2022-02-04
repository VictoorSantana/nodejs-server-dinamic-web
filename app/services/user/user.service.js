
const userRepository = require('./user.repository');
const authRepository = require('../auth/auth.repository');
const { onlyNumbers, resume } = require('../../config/filter');

module.exports = {
    find: async function (query) {
        let exclude = [];
        let include = [];

        const { paginate } = resume(query, []);

        return await userRepository
            .findAndCountAll({
                ...paginate,
                attributes: { exclude, include }
            });
    },

    findOne: async function (id) {
        let exclude = [];
        return await userRepository
            .findOne({
                where: { id: onlyNumbers(id) }
            });
    },

    create: async function (value) {
        const existUser = await userRepository.findOne({ where: { email: value.email } });
        const existAuth = await authRepository.findOne({ where: { username: value.auth.username } });

        if (existUser) {
            throw new Error('Email já está em uso!');
        }
        if (existAuth) {
            throw new Error('Nome de usuário já está em uso!');
        }

        const user = await userRepository
            .create(value);

        const auth = await authRepository
            .create({
                username: value.auth.username,
                password: value.auth.password,
                id_user: user.id,
            });

        authRepository.belongsTo(userRepository, { foreignKey: 'id_user' });
        let exclude = ['password', 'id_user'];
        return await authRepository
            .findOne({
                where: { id: auth.id },
                attributes: { exclude },
                include: [
                    { model: userRepository, as: 'user' },
                ]
            });
    },

    update: async function (id, value) {
        await userRepository
            .update(value, {
                where: { id: onlyNumbers(id) }
            });
        return await this.findOne(id);
    },

    delete: async function (id) {
        return await userRepository
            .destroy({
                where: { id: onlyNumbers(id) }
            });
    }
}