const Joi = require('@hapi/joi');

module.exports = Joi.object({
	name: Joi.string().max(60).required().messages({
		'string.base': 'campo "name" deve ser do tipo "texto".',
		'string.empty': 'campo "name" não pode ser vazio.',
		'string.min': 'campo "name" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "name" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "name" é obrigatorio ser preenchido.'
	}),
	plugins: Joi.string().max(150).required().messages({
		'string.base': 'campo "plugins" deve ser do tipo "texto".',
		'string.empty': 'campo "plugins" não pode ser vazio.',
		'string.min': 'campo "plugins" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "plugins" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "plugins" é obrigatorio ser preenchido.'
	}),
});

