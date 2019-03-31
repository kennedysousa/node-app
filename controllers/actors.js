const model = require('../models/index');
const paginate = require('express-paginate');

exports.getActors = function (req, res, next) {
    model.actor.findAndCountAll({
        attributes: ['actor_id', 'first_name', 'last_name'],
        limit: req.query.limit, 
        offset: req.skip
    })
    .then(results => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.json({
            error: false,
            data: {
                actors: results.rows,
                next: paginate.hasNextPages(req)(pageCount),
                pageCount: pageCount,
                itemCount: itemCount,
                pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
                
            }
        });
    })
    .catch(err => next(err))
}