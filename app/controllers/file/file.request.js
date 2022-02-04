const Joi = require('@hapi/joi');

module.exports = Joi.object({
    title: Joi.string().max(150).required().messages({
        'string.base': 'campo "title" deve ser do tipo "texto".',
        'string.empty': 'campo "title" não pode ser vazio.',
        'string.min': 'campo "title" deve ter o tamanho minimo de {#limit}',
        'string.max': 'campo "title" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "title" é obrigatorio ser preenchido.'
    }),
    id_folder_parent: Joi.number().required().messages({
        'number.base': 'campo "id_folder_parent" deve ser do tipo "numero".',
        'number.empty': 'campo "id_folder_parent" não pode ser vazio.',
        'number.min': 'campo "id_folder_parent" deve ter o tamanho minimo de {#limit}',
        'number.max': 'campo "id_folder_parent" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "id_folder_parent" é obrigatorio ser preenchido.'
    })
});

