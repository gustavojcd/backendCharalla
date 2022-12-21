const passport = require('passport')
const express = require('express')
const { signUp, login, getHome, logout } = require('../controller/user.controller')
const { isLoggedIn } = require('../middleware/user.middleware')

const rutasUser = express.Router()

rutasUser.use(express.json());
rutasUser.use(express.urlencoded({ extended: true }));

const passportOptions = { badRequestMessage: 'falta username / password' }

rutasUser.route('/signup')
    .post(signUp)

rutasUser.route('/login')
    .post(passport.authenticate('login', passportOptions), login)

rutasUser.route('/home')
    .get(isLoggedIn, getHome)

rutasUser.route('/logout')
    .post(logout)

module.exports = rutasUser
