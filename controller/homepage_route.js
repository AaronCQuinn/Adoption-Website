// Imports.
const path = require('path');
const express = require('express');
const router = express.Router();
const Users = require('../models/registration');

router.get('/', (req, res) => {
    res.render(path.resolve('./views/homepage.ejs'), {name: undefined});
});

// Two below routes are on the homepage, but are more suited to a login route. Could possibly break these two routes into their own file.
router.post('/newUser', async (req, res) => {
    const {fullName, email, password, phNumber, gender, address} = req.body;
    let newUser = await Users.findOne({email});
    if (newUser) {
        console.log("User already exists in database.");
        res.redirect('/');
    } else {
    newUser = new Users({
        fullName: fullName,
        email: email,
        phoneNumber: phNumber,
        password: password,
        gender: gender,
        address: address
    });
    newUser.save()
        .then((result) => {
            console.log("New user successfully added to the database: " + result);
            res.redirect('/');
        })
        .catch((error) => {
            console.log("Error adding user to the database: " + error);
        })
}});

router.post('/loginUser', async (req, res) => {
    const {email, password} = req.body;
    let loginUser = await Users.findOne({email});
    if (loginUser && loginUser.password === password) {
        console.log(`User ${loginUser.fullName} has successfully logged in.`);
        req.session.isLoggedIn = true;

        // TODO: Look into better way to pass user identifying information then appending it to session.
        req.session.username = loginUser.fullName;
        req.session.email = loginUser.email;
        res.render(path.resolve('./views/homepage.ejs'), {name: req.session.username});
    } else  {
        res.redirect('/loginError');
    }
})

module.exports = router;