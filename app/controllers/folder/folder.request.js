const Joi = require('@hapi/joi');

module.exports = Joi.object({
    title: Joi.string().max(150).required().messages({
        'string.base': 'campo "title" deve ser do tipo "texto".',
        'string.empty': 'campo "title" não pode ser vazio.',
        'string.min': 'campo "title" deve ter o tamanho minimo de {#limit}',
        'string.max': 'campo "title" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "title" é obrigatorio ser preenchido.'
    }),
    id_folder_parent: Joi.number().messages({
        'number.base': 'campo "id folder parent" deve ser do tipo "numero".',
        'number.empty': 'campo "id folder parent" não pode ser vazio.',
        'number.min': 'campo "id folder parent" deve ter o tamanho minimo de {#limit}',
        'number.max': 'campo "id folder parent" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "id folder parent" é obrigatorio ser preenchido.'
    }),
});

