var express = require('express');
var paginate = require('express-paginate');
var router = express.Router();

var model = require('../models/index');
 
// This example assumes you've previously defined `Users`
// as `const Users = sequelize.define('Users',{})` if you are using `Sequelize`
// and that you are using Node v7.6.0+ which has async/await support

// keep this before all routes that will use pagination
router.use(paginate.middleware(2, 3));
 
router.get("/", async(req, res, next) => {
    model.User.findAndCountAll({
        attributes: ['id', 'name'],
        limit: req.query.limit, 
        offset: req.skip
    })
    .then(results => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.json({
            error: false,
            data: {
                users: results.rows,
                next: paginate.hasNextPages(req)(pageCount),
                //pageCount: pageCount,
                //itemCount: itemCount,
                pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
                
            }
        });
    })
    .catch(err => next(err))
});

module.exports = router;
