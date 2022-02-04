const express = require('express');
const router = express.Router();
const { request, validate } = require('../../config/domain');
const authRequest = require('./auth.request');
const authService = require('../../services/auth/auth.service');

router.get('/whoiam', request(), async function (req, res) {
    try {
        const response = await authService.findUser(req.user.id);
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        res.status(401).send(e.message);
    }
});

router.post('/login', validate(authRequest), async function (req, res) {
    try {
        const response = await authService.login(req.value);
        res.status(200).send(response);
    } catch (e) {
        res.status(401).send(e.message);
    }
});


module.exports = router;