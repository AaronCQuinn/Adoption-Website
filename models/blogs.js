const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogText: {
        type: String,
        required: true
    },
    blogPictures: {
        type: Array,  
    },
}, {timestamps: true});

const Blogs = mongoose.model('Blogs', blogSchema);
module.exports = Blogs;