
const userRepository = require('../user/user.repository');
const authRepository = require('./auth.repository');
const { onlyNumbers } = require('../../config/filter');
const HttpError = require('../../config/error');
const jwt = require('jsonwebtoken');

module.exports = {
    findUser: async function (id) {
        authRepository.belongsTo(userRepository, { foreignKey: 'id_user' });

        console.log(id);
        let exclude = ['password'];
        return await authRepository
            .findOne({
                where: { id_user: onlyNumbers(id) },
                attributes: { exclude },
                include: [
                    { model: userRepository, as: 'user' },
                ]
            });
    },

    login: async function (value) {
        authRepository.belongsTo(userRepository, { foreignKey: 'id_user' });
        let exclude = ['password', 'id_user'];        

        const userAuth = await authRepository
            .findOne({
                where: { username: value.username, password: value.password },
                attributes: { exclude },
                include: [
                    { model: userRepository, as: 'user' },
                ]
            });
            
        if (userAuth) {
            const token = jwt.sign({ user: userAuth.user }, process.env.SERVER_KEY, { expiresIn: process.env.SERVER_EXPIRES });
            return {
                token: token,
                user: userAuth.user
            };
        } else {
            throw new HttpError('Usuário ou senha não foi encontrado', 404);
        }


    }



}