const Joi = require('@hapi/joi');

module.exports = Joi.object({
	id_layout: Joi.number().required().messages({
		'number.base': 'campo "id_layout" deve ser do tipo "numero".',
		'number.empty': 'campo "id_layout" não pode ser vazio.',
		'number.min': 'campo "id_layout" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "id_layout" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "id_layout" é obrigatorio ser preenchido.'
	}),
	id_cover_image: Joi.number().required().messages({
		'number.base': 'campo "id_cover_image" deve ser do tipo "numero".',
		'number.empty': 'campo "id_cover_image" não pode ser vazio.',
		'number.min': 'campo "id_cover_image" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "id_cover_image" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "id_cover_image" é obrigatorio ser preenchido.'
	}),
	id_folder_parent: Joi.number().required().messages({
		'number.base': 'campo "id_folder_parent" deve ser do tipo "numero".',
		'number.empty': 'campo "id_folder_parent" não pode ser vazio.',
		'number.min': 'campo "id_folder_parent" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "id_folder_parent" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "id_folder_parent" é obrigatorio ser preenchido.'
	}),
	id_section: Joi.number().required().default(0).messages({
		'number.base': 'campo "id_section" deve ser do tipo "numero".',
		'number.empty': 'campo "id_section" não pode ser vazio.',
		'number.min': 'campo "id_section" deve ter o tamanho minimo de {#limit}',
		'number.max': 'campo "id_section" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "id_section" é obrigatorio ser preenchido.'
	}),
	short: Joi.string().max(130).messages({
		'string.base': 'campo "short" deve ser do tipo "texto".',
		'string.empty': 'campo "short" não pode ser vazio.',
		'string.min': 'campo "short" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "short" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "short" é obrigatorio ser preenchido.'
	}),
	title: Joi.string().max(200).required().messages({
		'string.base': 'campo "title" deve ser do tipo "texto".',
		'string.empty': 'campo "title" não pode ser vazio.',
		'string.min': 'campo "title" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "title" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "title" é obrigatorio ser preenchido.'
	}),
	complement: Joi.string().max(200).required().messages({
		'string.base': 'campo "complement" deve ser do tipo "texto".',
		'string.empty': 'campo "complement" não pode ser vazio.',
		'string.min': 'campo "complement" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "complement" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "complement" é obrigatorio ser preenchido.'
	}),
	content: Joi.string().max(2000).required().messages({
		'string.base': 'campo "content" deve ser do tipo "texto".',
		'string.empty': 'campo "content" não pode ser vazio.',
		'string.min': 'campo "content" deve ter o tamanho minimo de {#limit}',
		'string.max': 'campo "content" deve ter o tamanho maximo de {#limit}',
		'any.required': 'campo "content" é obrigatorio ser preenchido.'
	}),
});

