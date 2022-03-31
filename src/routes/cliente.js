const routerm = require('express').Router();

const clienteController = require('../controllers/clienteController');

// Este middleware permite protejer las rutas
const authMiddleware = require('../middlewares/authMiddleware');

routerm.get('/', authMiddleware.isAuthenticated, clienteController.listm);
routerm.post('/addm', authMiddleware.isAuthenticated, clienteController.savem);
routerm.get('/updatem/:id', authMiddleware.isAuthenticated, clienteController.editm);
routerm.post('/updatem/:id', authMiddleware.isAuthenticated, clienteController.updatem);
routerm.get('/deletem/:id', authMiddleware.isAuthenticated, clienteController.deletem);


module.exports = routerm;

