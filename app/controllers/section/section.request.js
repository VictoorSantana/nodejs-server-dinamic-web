const Joi = require('@hapi/joi');

module.exports = Joi.object({
	id_layout: Joi.number().required().messages({
		'number.base': 'campo "id_layout" deve ser do tipo "numero".',
		'number.empty': 'campo "id_layout" não pode ser vazio.',
		'number.min': 'campo "id_layout" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "id_layout" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "id_layout" é obrigatorio ser preenchido.'
	}),
	id_section: Joi.number().required().default(0).messages({
		'number.base': 'campo "id_section" deve ser do tipo "numero".',
		'number.empty': 'campo "id_section" não pode ser vazio.',
		'number.min': 'campo "id_section" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "id_section" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "id_section" é obrigatorio ser preenchido.'
	}),
	title: Joi.string().max(100).required().messages({
		'string.base': 'campo "title" deve ser do tipo "texto".',
		'string.empty': 'campo "title" não pode ser vazio.',
		'string.min': 'campo "title" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "title" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "title" é obrigatorio ser preenchido.'
	}),
	description: Joi.string().max(100).required().messages({
		'string.base': 'campo "description" deve ser do tipo "texto".',
		'string.empty': 'campo "description" não pode ser vazio.',
		'string.min': 'campo "description" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "description" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "description" é obrigatorio ser preenchido.'
	}),
	display: Joi.number().default(1).messages({
		'number.base': 'campo "display" deve ser do tipo "numero".',
		'number.empty': 'campo "display" não pode ser vazio.',
		'number.min': 'campo "display" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "display" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "display" é obrigatorio ser preenchido.'
	}),
});

