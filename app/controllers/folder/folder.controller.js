const express = require('express');
const router = express.Router();
const { request, meta } = require('../../config/domain');
const folderRequest = require('./folder.request');
const folderService = require('../../services/folder/folder.service');

router.get('/', request(), async function (req, res) {
    try {
        const response = await folderService.find(req.query);
        res.status(200).send(meta(response, req.query));
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.get('/:id', request(), async function (req, res) {
    try {
        const response = await folderService.findOne(req.params.id);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});
 
router.post('/', request(folderRequest), async function (req, res) {
    try {
        const response = await folderService.create(req.value);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.put('/:id', request(folderRequest), async function (req, res) {
    try {
        const response = await folderService.update(req.params.id, req.value);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.delete('/:id', request(), async function (req, res) {
    try {
        const response = await folderService.delete(req.params.id);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});


module.exports = router;