// importar router de express
const { Router } = require('express');

// importar check express-validator
const { check } = require('express-validator');
const { login, revalidarToken } = require('../../../controllers/public/modulos/auth.controller');
const { validarCampos } = require('../../../middlewares/validar_campos');
const { validarJWT } = require('../../../middlewares/validar_jwt');

// inicializar Router de express
const router = Router();

// validaciones 
const validacionAutenticacion = [
    // campo de usuario
    check('nombre_usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
    // campo contrasenia
    check('contrasenia', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
]

router.post('/login', validacionAutenticacion, login);

// validar refrescar
router.get( '/renew', validarJWT , revalidarToken ); 

module.exports = router;