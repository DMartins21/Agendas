const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
// Rotas da home
route.get('/', homeController.index);

//rotas de login
route.get('/login/', loginController.index);
route.get('/login/register', loginController.register);
route.get('/login/logout', loginController.logout)
route.post('/login/register', loginController.userRegister);
route.post('/login/login', loginController.login)

module.exports = route;
