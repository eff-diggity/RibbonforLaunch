const express = require("express");

//Auth Route Dependencies 
const bodyParser = require("body-parser"); //Need to npm install
const res = require("express/lib/response"); 
const authRouter = require("./server/routes/auth-routes/auth-routes");
const clientRouter = require("./server/routes/client-routes/client-routes");
const app = express();
const contactRouter = require("./server/routes/contactRoutes");
app.use(express.json()); //allows us to access req.body

app.use(authRouter);//brings in our Auth routes from seperate router file
app.use(clientRouter);



/***** EJS Configuration */
const expressLayouts = require('express-ejs-layouts');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use(authRouter);//brings in our Auth routes from seperate router file
app.use(contactRouter); //assists with viewing contact page


require("./server/mongoose");

const port = process.env.PORT || 8080;

const routes = require('./server/routes/ribbonRoutes.js')
app.use('/', routes)
const req = require("express/lib/request");

app.listen(port, () => console.log(`server is running on ${port}`));
