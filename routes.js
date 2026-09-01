const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index);

//rotas de login
route.get('/login/', loginController.index);
route.get('/login/register', loginController.register);
route.get('/login/logout', loginController.logout)
route.post('/login/register', loginController.userRegister);
route.post('/login/login', loginController.login)

//rotas de contato
route.get('/contato/', loginRequired, contatoController.index)
route.get('/contato/create', loginRequired, contatoController.create)
route.get('/contato/:id', loginRequired, contatoController.editIndex)
route.get('/contato/delete/:id', loginRequired, contatoController.deleteContato)
route.post('/contato/delete/:id', loginRequired, contatoController.deleteContato)
route.post('/contato/edit/:id', loginRequired, contatoController.edit)
route.post('/contato/create', loginRequired, contatoController.createContato)



module.exports = route;
