const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection'),
      dotenv = require('dotenv').config(),
      sessions = require('express-session'),
      cookieParser = require('cookie-parser')
      flash = require('connect-flash');


const app = express();

// importing routes
const dispositivoRoutes = require('./routes/dispositivo');
const clienteRoutes = require('./routes/cliente')

// settings
app.set('port', process.env.PORT || 16000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sesiones
const oneDay = 24 * 60 * 60 * 1000
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: oneDay }
}));

// configurando express para que trabaje con cookies
app.use(cookieParser());

// Connect Flash
app.use(flash());

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '12345',
  port: 3306,
  database: 'pos_bd'
}, 'single'));
app.use(express.urlencoded({extended: false}));
// routes
app.use('/', (req, res, next) => {
  res.locals.errors = req.flash('error');
  return next();
});
app.use('/', dispositivoRoutes);
app.use('/clientes', clienteRoutes)

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
