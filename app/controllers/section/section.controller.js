const express = require('express');
const router = express.Router();
const { request, meta } = require('../../config/domain');
const sectionRequest = require('./section.request');
const sectionService = require('../../services/section/section.service');

router.get('/', request(), async function (req, res) {
	try {
		const response = await sectionService.find(req.query);
		res.status(200).send(meta(response, req.query));
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.get('/:id', request(), async function (req, res) {
	try {
		const response = await sectionService.findOne(req.params.id);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});
 
router.post('/', request(sectionRequest), async function (req, res) {
	try {
		const response = await sectionService.create(req.value);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.put('/:id', request(sectionRequest), async function (req, res) {
	try {
		const response = await sectionService.update(req.params.id, req.value);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.delete('/:id', request(), async function (req, res) {
	try {
		const response = await sectionService.delete(req.params.id);
		res.sendStatus(200).send(response);
	} catch (e) {
		console.error(e);
		res.sendStatus(401).send(e.message);
	}
});


module.exports = router;