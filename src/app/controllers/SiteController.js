const Course = require('../models/Course')

const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    // GET /
    index(req, res, next) {


        // CALL BACK
        // Course.find({}, function(err, courses) {
        //     if(!err) res.json(courses);
        //     else res.status(400).json({error: 'ERROR!'})
        // })

        // PROMISES
        Course.find({})
            .then(courses => { 
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next)

    }

    // GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
