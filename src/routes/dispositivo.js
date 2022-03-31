const router = require('express').Router();

const authController = require('../controllers/authController');
const dispositivoController = require('../controllers/dispositivoController');

// Este middleware permite protejer las rutas
const authMiddlerware = require('../middlewares/authMiddleware');

router.get('/', authMiddlerware.isAuthenticated, dispositivoController.list);
router.post('/add', authMiddlerware.isAuthenticated, dispositivoController.save);
router.get('/update/:id', authMiddlerware.isAuthenticated, dispositivoController.edit);
router.post('/update/:id', authMiddlerware.isAuthenticated, dispositivoController.update);
router.get('/delete/:id', authMiddlerware.isAuthenticated, dispositivoController.delete);

// Login
router.get('/login', authController.loginView);
router.post('/login', authController.login);

// Register
router.get('/register', authMiddlerware.isAuthenticated, authController.registerView);
router.post('/register', authMiddlerware.isAuthenticated, authController.register);

// Logout
router.get('/logout', authController.logout);

module.exports = router;

