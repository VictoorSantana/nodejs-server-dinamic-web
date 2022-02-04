const express = require('express');
const router = express.Router();
const { request, meta } = require('../../config/domain');
const articleRequest = require('./article.request');
const articleFullRequest = require('./articleFull.request');
const articleService = require('../../services/article/article.service');

router.get('/', request(), async function (req, res) {
	try {
		const response = await articleService.find(req.query);
		res.status(200).send(meta(response, req.query));
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.get('/:id', request(), async function (req, res) {
	try {
		const response = await articleService.findOne(req.params.id);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});
 
router.post('/', request(articleRequest), async function (req, res) {
	try {
		const response = await articleService.create(req.value);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.post('/full', request(articleFullRequest), async function (req, res) {
	try {
		const response = await articleService.createFull(req.value, req.files);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.put('/:id', request(articleRequest), async function (req, res) {
	try {
		const response = await articleService.update(req.params.id, req.value);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.delete('/:id', request(), async function (req, res) {
	try {
		const response = await articleService.delete(req.params.id);
		res.sendStatus(200).send(response);
	} catch (e) {
		console.error(e);
		res.sendStatus(401).send(e.message);
	}
});


module.exports = router;