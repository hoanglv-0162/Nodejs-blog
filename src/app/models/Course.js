const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');

const slug = require('mongoose-slug-generator')

const Schema = mongoose.Schema

const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String, maxlength: 1000},
    thumbnail: String,
    image: String,
    videoID: String,
    slug: {type: String, slug: "name"}
}, {
    timestamps: true
})

mongoose.plugin(slug)
Course.plugin(mongooseDelete, {
    overrideMethods: 'all'
})

module.exports = mongoose.model('Course', Course)