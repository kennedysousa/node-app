var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
    model.User.findAll({
        attributes: ['id', 'name']
    })
    .then(users => res.json({
        error: false,
        data: users
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }))
});

module.exports = router;
