const jwt = require("jsonwebtoken");

const generarJWT = (id = '', entidad_id = '') => {

    return new Promise((resolve, reject) => {

        const payload = {
            id: id,
            entidad_id: entidad_id
        };

        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('No se puede generar el token.')
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}