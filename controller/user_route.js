const path = require('path');
const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');

let userValid = function(req, res, next) {
    let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let nameRegex = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (phRegex.test(req.body.phNumber)
    && passRegex.test(req.body.password)
    && nameRegex.test(req.body.fullName)
    && (emailRegex.test(req.body.email))) {
        next()
    } else {
        res.redirect('/');
    }
}

router.post('/newUser', userValid, async (req, res) => {
    const {email} = req.body;
    let newUser = await Users.findOne({email});
    if (newUser) {
        console.log("User already exists in database.");
        res.redirect('/');
    } else {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            newUser = new Users({
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phNumber,
                hashedPass: hashedPassword,
            });
        } catch {
            console.log('Error creating hashed password.');
        };
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
    const user = await Users.findOne({email: email});
    if (user === null) {
        console.log("User doesn't exist.");
    }
    await bcrypt.compare(password, user.hashedPass)
    .then((result) => {
        if (result) {
        console.log(`User ${user.fullName} has successfully logged in.`);
        req.session.user = {fullName: user.fullName, _id: user._id, isAdmin: user.isAdmin};
        res.redirect('/');
        } else {
            res.redirect('/');
        }
    })
    .catch((error) => console.log(`Error comparing password: ${error}`))
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
    });

    res.clearCookie(process.env.SESSION_SECRET);
    res.redirect('/');
});

module.exports = router;