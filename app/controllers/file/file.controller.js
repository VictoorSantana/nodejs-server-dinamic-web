const express = require('express');
const router = express.Router();
const { request, meta } = require('../../config/domain');
const fileRequest = require('./file.request');
const fileService = require('../../services/file/file.service');

router.get('/', request(), async function (req, res) {
    try {
        const response = await fileService.find(req.query);
        res.status(200).send(meta(response, req.query));
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.get('/:id', request(), async function (req, res) {
    try {
        const response = await fileService.findOne(req.params.id);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});
 
router.post('/', request(fileRequest), async function (req, res) {
    try {
        const response = await fileService.upload(req.value, req.files);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.put('/:id', request(fileRequest), async function (req, res) {
    try {
        const response = await fileService.update(req.params.id, req.value);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.delete('/:id', request(), async function (req, res) {
    try {
        const response = await fileService.delete(req.params.id);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});


module.exports = router;