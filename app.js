require('dotenv').config(); // Import .env to handle environment variables.
const database = require('./database'); // Connect to the database.

// Required imports.
const express = require('express');
const app = express();
const Sessions = require('./sessions');
app.use(Sessions);
const flash = require('express-flash');
app.use(flash());

// Set view engine to parse ejs.
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}), express.json());
app.use(express.static(__dirname + '/public'));

// TODO: Look into better way to consolidate route imports instead of just repeating?
const homepageRoute = require('./controller/homepage_route');
const loginErrorRoute = require('./controller/loginError_route');
const userProfileRoute = require('./controller/userProfile_route');

app.use(homepageRoute, loginErrorRoute, userProfileRoute);

app.listen(process.env.PORT || 3000, () => (console.log(`Server listening on port ${process.env.PORT}.`)));