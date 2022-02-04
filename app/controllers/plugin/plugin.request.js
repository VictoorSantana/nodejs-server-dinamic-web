const Joi = require('@hapi/joi');

module.exports = Joi.object({
	id_plugin: Joi.number().required().messages({
		'number.base': 'campo "id_plugin" deve ser do tipo "numero".',
		'number.empty': 'campo "id_plugin" não pode ser vazio.',
		'number.min': 'campo "id_plugin" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "id_plugin" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "id_plugin" é obrigatorio ser preenchido.'
	}),
	id_args: Joi.number().required().default(0).messages({
		'number.base': 'campo "id_args" deve ser do tipo "numero".',
		'number.empty': 'campo "id_args" não pode ser vazio.',
		'number.min': 'campo "id_args" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "id_args" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "id_args" é obrigatorio ser preenchido.'
	}),
	place: Joi.string().max(20).required().messages({
		'string.base': 'campo "place" deve ser do tipo "texto".',
		'string.empty': 'campo "place" não pode ser vazio.',
		'string.min': 'campo "place" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "place" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "place" é obrigatorio ser preenchido.'
	}),
	classNames: Joi.string().max(2000).messages({
		'string.base': 'campo "classNames" deve ser do tipo "texto".',
		'string.empty': 'campo "classNames" não pode ser vazio.',
		'string.min': 'campo "classNames" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "classNames" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "classNames" é obrigatorio ser preenchido.'
	})
});

