const express = require('express');
const router = express.Router();
const { request, validate, meta } = require('../../config/domain');
const userRequest = require('./user.request');
const userService = require('../../services/user/user.service');

router.get('/', request(), async function (req, res) {
    try {
        const response = await userService.find(req.query);
        res.status(200).send(meta(response, req.query));
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.get('/:id', request(), async function (req, res) {
    try {
        const response = await userService.findOne(req.params.id);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});
 
router.post('/', validate(userRequest), async function (req, res) {
    try {
        const response = await userService.create(req.value);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.put('/:id', request(userRequest), async function (req, res) {
    try {
        const response = await userService.update(req.params.id, req.value);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});

router.delete('/:id', request(), async function (req, res) {
    try {
        const response = await userService.delete(req.params.id);
        res.status(201).send(response);
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
    }
});


module.exports = router;