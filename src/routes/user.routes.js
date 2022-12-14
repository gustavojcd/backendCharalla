const express = require('express');
const { login, logout } = require('../controllers/user.controllers');
const { validateLogin } = require('../middleware/middleware');

const rutasUser = express.Router();

rutasUser.post('/login', login);
rutasUser.get('/info', validateLogin)
rutasUser.post('/logout', logout);

module.exports = rutasUser;
