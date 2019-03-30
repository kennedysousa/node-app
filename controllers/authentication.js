const model = require('../models/index');
const jwt = require ('jwt-simple');
const paginate = require('express-paginate');

const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

function tokenForUser(user) {
    const timestamp = new Date().getTime;
    return jwt.encode({ sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function (req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
    if (!email || !name || !password){
        return res.status(422).send({ error: 'You must provide an username, e-mail and password.' });
    }

    model.User.findOne({
        where: {email: email}
    }).then(existingUser => {
        if (existingUser) {
            return res.status(422).send({ error: 'Email is already in use.' });
        }

        const user = model.User.build({
            name: name,
            email: email,
            password: password
        })
        .save()
        .then(function(newUser) {
            res.status(200).send({token: tokenForUser(newUser)});
        })
    });
}

exports.signin = function(req, res, next) {
    // User has already had his email and password auth'd
    // we just need to give him a token
    res.send({ token: tokenForUser(req.user) });
}

