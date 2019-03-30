const model = require('../models/index');
const paginate = require('express-paginate');

exports.getUsers = function (req, res, next) {
    model.User.findAndCountAll({
        attributes: ['id', 'name', 'email'],
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
                pageCount: pageCount,
                itemCount: itemCount,
                pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
                
            }
        });
    })
    .catch(err => next(err))
}