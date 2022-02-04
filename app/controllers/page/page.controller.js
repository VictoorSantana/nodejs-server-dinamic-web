const express = require('express');
const router = express.Router();
const pageService = require('../../services/page/page.service');

router.get('/', async function (req, res) {
	try {
		const response = await pageService.buildHome(req.query);
		res.status(200).send(response);
	} catch (e) {
		console.error(e);
		res.status(401).send(e.message);
	}
});


router.get('/artigo/:slug/:id', async function (req, res) {
	try {		
		const { slug, id } = req.params;
		const response = await pageService.buildArticle(slug, id, req.query);
		res.status(200).send(response);
	} catch (e) {
		console.error(e);
		res.status(e.status ? e.status : 401).send(e.message);
	}
});


router.get('/secao/:slug/:id', async function (req, res) {
	try {		
		const { slug, id } = req.params;
		const response = await pageService.buildSection(slug, id, req.query);
		res.status(200).send(response);
	} catch (e) {
		console.error(e);
		res.status(e.status ? e.status : 401).send(e.message);
	}
});

module.exports = router;