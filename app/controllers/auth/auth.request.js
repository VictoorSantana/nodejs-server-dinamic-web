



const Joi = require('@hapi/joi');
module.exports = Joi.object({
    username: Joi.string().max(110).required().messages({
        'string.base': 'campo "username" deve ser do tipo "texto".',
        'string.empty': 'campo "username" não pode ser vazio.',
        'string.min': 'campo "username" deve ter o tamanho minimo de {#limit}',
        'string.max': 'campo "username" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "username" é obrigatorio ser preenchido.'
    }),
    password: Joi.string().max(110).required().messages({
        'string.base': 'campo "password" deve ser do tipo "texto".',
        'string.empty': 'campo "password" não pode ser vazio.',
        'string.min': 'campo "password" deve ter o tamanho minimo de {#limit}',
        'string.max': 'campo "password" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "password" é obrigatorio ser preenchido.'
    }),
});

