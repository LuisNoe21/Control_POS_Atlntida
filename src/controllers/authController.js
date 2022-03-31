const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginView = (req, res) => res.render('login');

exports.login = (req, res) => {
    const { username, password } = req.body;

    let errors = [];

    if(username.length === 0) {
        errors.push('El usuario es obligatorio');
    }

    if(password.length === 0) {
        errors.push('La contraseña es obligatorio');
    }

    if(errors.length > 0) {
        errors.forEach(err => {
            req.flash('error', err);
        });
        return res.redirect('/login');
    }

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE username = ?', [username], (err, users) => {
            if (err) {
                return res.json(err);
            }
            if(users.length === 0) {
                req.flash('error', 'Usuario o contraseña incorrectos');
                return res.redirect('/login')
            }

            const user = users[0];

            if(!bcryptjs.compareSync(password, user.password)) {
                req.flash('error', 'Usuario o contraseña incorrectos');
                return res.redirect('/login')
            }

            const id = user.id
            const token = jwt.sign({id: id}, process.env.JWT_SECRET)

            // guardar en la sesion el token generado
            req.session.token = token

            // el user y password son correctos, podemos continuar
            res.redirect('/')
        });
    });
}

exports.registerView = (req, res) => res.render('register');

exports.register = (req, res) => {
    const { fullname, username, password, cpassword } = req.body

    let errors = [];

    if(password.length < 8) {
        errors.push('La contraseña debe contener al menos 8 caracteres')
    }else if(password !== cpassword) {
        errors.push('Las contraseñas no coinciden')
    }

    if(fullname.length === 0) {
        errors.push('El fullname es obligatorio');
    }

    if(username.length === 0) {
        errors.push('El usuario es obligatorio');
    }

    if(password.length === 0) {
        errors.push('La contraseña es obligatorio');
    }

    if(errors.length > 0) {
        errors.forEach(err => {
            req.flash('error', err);
        });
        return res.redirect('/register');
    }

    // cifrar la contrasena
    const hash = bcryptjs.hashSync(password, 8)    
    
    // construir la data que será insertada
    const data = {
        username: username,
        password: hash,
        fullname: fullname
    }

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO users SET ?', [data], (err, users) => {
            if (err) {
                if(err?.code === 'ER_DUP_ENTRY') {
                    return res.render('register', {
                        errors: ['El usuario ya existe']
                    });
                }
                return res.json(err);
            }

            res.redirect('/login')
        });
    });
    
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}