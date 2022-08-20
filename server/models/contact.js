const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
});
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;