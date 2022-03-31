const { promisify } = require('util');
const jwt = require('jsonwebtoken');

// Creando un middleware para proteger las URL que necesitan inicio de sesion
exports.isAuthenticated = async (req, res, next) => {
    if (req.session.token) {
        // validar que el token le pertenezca al usuario
        const verifyPromise = await promisify(jwt.verify)
        const decoded = await verifyPromise(req.session.token, process.env.JWT_SECRET)

        // decoded: {id: <id del user en base de datos>}
        const userID = decoded.id
        
        // consultar en la base de datos si el usuario que se decodificó del token, existe
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM users WHERE id = ?', [userID], (err, users) => {
                if (err) {
                    return res.redirect('/login')
                }

                if (users.length === 0) {
                    return res.redirect('/login')
                }

                // el usuario existe
                session = req.session
                session.user = users[0]
                next()
            });
        });
        
    }
    else {
        // el token no exite, por tanto, no se ha iniciado sesion
        return res.redirect('/login')
    }
}