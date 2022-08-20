const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const blogDb = mongoose.connection;
blogDb.on('error', console.error.bind(console, 'connection error:'));
blogDb.once('open', function () {
    console.log('Connected')
});

// Models
require('./Category');
require('./BlogPost');



