



const Joi = require('@hapi/joi');
const authRequest = require('../auth/auth.request');
module.exports = Joi.object({
    name: Joi.string().max(110).required().messages({
        'string.base': 'campo "name" deve ser do tipo "texto".',
        'string.empty': 'campo "name" não pode ser vazio.',
        'string.min': 'campo "name" deve ter o tamanho minimo de {#limit}',
        'string.max': 'campo "name" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "name" é obrigatorio ser preenchido.'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'campo "email" deve ser do tipo "texto".',
        'string.empty': 'campo "email" não pode ser vazio.',
        'string.min': 'campo "email" deve ter o tamanho minimo de {#limit}',
        'string.max': 'campo "email" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "email" é obrigatorio ser preenchido.'
    }),
    birthday: Joi.date().required().messages({
        'date.base': 'campo "birthday" deve ser do tipo "data".',
        'date.empty': 'campo "birthday" não pode ser vazio.',
        'date.min': 'campo "birthday" deve ter o tamanho minimo de {#limit}',
        'date.max': 'campo "birthday" deve ter o tamanho maximo de {#limit}',
        'any.required': 'campo "birthday" é obrigatorio ser preenchido.'
    }),
    auth: authRequest.required()
});

