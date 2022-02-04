
const fileRepository = require('./file.repository');
const { onlyNumbers, resume } = require('../../config/filter');
const storage = require('../../config/storage');
module.exports = {
    find: async function (query) {
        let exclude = [];
        let include = [];

        const { paginate } = resume(query, []);

        return await fileRepository
            .findAndCountAll({
                ...paginate,
                attributes: { exclude, include }
            });
    },

    findOne: async function (id) {
        let exclude = [];
        return await fileRepository
            .findOne({
                where: { id: onlyNumbers(id) }
            });
    },

    create: async function (value) {
        return await fileRepository
            .create(value);
    },

    upload: async function (value, files) {

        if(files) {
            if(!files['stream']) {
                throw new Error('Não foi encontrado arquivo dentro do "stream".');
            }
        } else {
            throw new Error('Adicione um arquivo na propriedade "stream" antes de enviar.');
        }
        
        const filesResult = storage.several(files['stream']);


        for(let k = 0; k < filesResult.length; k++) {
            const file = filesResult[k];

            await fileRepository
                .create({                
                    ...value,
                    ...file,
                });
        }

        return `saved ${filesResult.length} files`;    
    },


    update: async function (id, value) {
        // await fileRepository
        //     .update(value, {
        //         where: { id: onlyNumbers(id) }
        //     });
        return await this.findOne(id);
    },

    delete: async function (id) {
        return await fileRepository
            .destroy({
                where: { id: onlyNumbers(id) }
            });
    }
}