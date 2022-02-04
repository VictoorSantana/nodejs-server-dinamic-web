const express = require('express');
const router = express.Router();
const { request, meta } = require('../../config/domain');
const layoutRequest = require('./layout.request');
const layoutService = require('../../services/layout/layout.service');

router.get('/', request(), async function (req, res) {
	try {
		const response = await layoutService.find(req.query);
		res.status(200).send(meta(response, req.query));
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.get('/:id', request(), async function (req, res) {
	try {
		const response = await layoutService.findOne(req.params.id);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});
 
router.post('/', request(layoutRequest), async function (req, res) {
	try {
		const response = await layoutService.create(req.value);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.put('/:id', request(layoutRequest), async function (req, res) {
	try {
		const response = await layoutService.update(req.params.id, req.value);
		res.status(201).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});

router.delete('/:id', request(), async function (req, res) {
	try {
		const response = await layoutService.delete(req.params.id);
		res.sendStatus(200).send(response);
	} catch (e) {
		console.error(e);
		res.sendStatus(401).send(e.message);
	}
});


module.exports = router;