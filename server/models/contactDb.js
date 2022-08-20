const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const contactDb = mongoose.connection;
contactDb.on('error', console.error.bind(console, 'connection error;'));
contactDb.once('open', function () {
    console.log('Connected?')
});

require('./contact');

//following Raddy's Youtube video that Francesca followed