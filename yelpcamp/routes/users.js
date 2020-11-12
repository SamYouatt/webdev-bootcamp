const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utils/CatchAsync');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.createUser))

router.route('/login')
    .get(users.renderLogIn)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(users.logIn))

router.get('/logout', users.logOut);

module.exports = router;