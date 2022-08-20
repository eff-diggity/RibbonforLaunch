const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },

    category: {
        type: String,
        enum: ['Plant Medicine', 'Occult History', 'Tarot', 'Astrology', 'Classes'],
        required: 'This field is required.'
    },

    text: {
        type: String,
        required: 'This field is required.'
    },


    image: {
        type: String,
        required: 'This field is required.'
    }
});

blogPostSchema.index({title: 'text', category: 'text', text: 'text' }); 

module.exports = mongoose.model('BlogPost', blogPostSchema);
