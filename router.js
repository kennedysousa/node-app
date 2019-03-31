const express = require('express');
const paginate = require('express-paginate');
const router = express.Router();
const Authentication = require('./controllers/authentication');
const users = require('./controllers/users');
const actors = require('./controllers/actors');
const passportService = require('./services/passport');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.post('/signup', Authentication.signup);
router.post('/signin', requireSignin, Authentication.signin);

// It assumes you've previously defined `Users`
// as `const Users = sequelize.define('Users',{})` if you are using `Sequelize`
// and that you are using Node v7.6.0+ which has async/await support

// keep this before all routes that will use pagination
router.use(paginate.middleware(50, 100));

//router.get('/api/v1/users', requireAuth, users.getUsers);
router.get('/api/v1/users', users.getUsers);
router.get('/api/v1/actors', actors.getActors);

router.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
});

module.exports = router;