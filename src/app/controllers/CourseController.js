const { mongooseToObject } = require("../../util/mongoose");
const Course = require("../models/Course");

class CourseController {

    // GET /courses/:slug
    show(req, res, next) {
        const query = Course.where({ slug: req.params.slug });
            Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('course/show', {course: mongooseToObject(course)})
            })
            .catch(next)
        return;
    }

    // GET courses/create
    create(req, res, next) {
        res.render('course/create')
    }

    // POST courses/store
    store(req, res, next) {
        // res.json(req.body)
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCdDoWybKmwAh9u7av6uJY5YtEEDw`;
        const course = new Course(formData)
        course.save()
            .then(() => {
                res.redirect('/')
            })
            .catch(() => {

            })
    }

    // GET courses/edit
    edit(req, res, next) {
        // const formData = req.body;
        // formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCdDoWybKmwAh9u7av6uJY5YtEEDw`;
        // const course = new Course(formData)
        // course.save()
        //     .then(() => {
        //         res.redirect('/')
        //     })
        Course.findById(req.params.id)
            .then(course => {
                res.render('course/edit', {course: mongooseToObject(course)})
            })
            .catch(next)
    }

    // PUT /courses/:id
    update(req, res, next) {
        // res.json(req.body)
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect('/me/stored/courses')
            })
            .catch(next)
    }

    // PATCH /courses/:id/restore
    restore(req, res, next) {
        // res.json(req.body)
        Course.restore({_id: req.params.id})
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // DELETE /courses/:id/destroy
    destroy(req, res, next) {
        // res.json(req.body)
        Course.deleteOne({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // soft delete
    // DELETE /courses/:id
    delete(req, res, next) {
        // res.json(req.body)
        Course.delete({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }
}

module.exports = new CourseController();
