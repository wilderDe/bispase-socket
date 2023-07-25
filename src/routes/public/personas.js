// importar router de express
const { Router } = require('express');

// importar check express-validator
const { check } = require('express-validator');

// importar la validacion de campos
const { validarCampos } = require('../../middlewares/validar_campos');
const { validarJWT } = require('../../middlewares/validar_jwt')

// importar funciones de controlador Persona
const {
    obtenerPersonas,
    obtenerUnaPersona,
    guardarPersona,
    actualizarPersona,
    eliminarPersona
} = require('../../controllers/public/personas.controller')


// guardar en un array las validaciones de los campos de la tabla PERSONAS
const validacionPersona = [
    validarJWT,
    // campo nombre
    check('nombre', 'el nombre es obligatorio.')
        .not().isEmpty()
        .custom((value) => {
            return value.match(/^[A-Za-z ]+$/);
        }).withMessage('Solo debe de contener carateres alpha y el caracter de espacio.'),
    // campo paterno
    check('paterno', 'El apellido paterno es obligatorio.')
        .not().isEmpty()
        .isAlpha().withMessage('solo debe contener caracteres alpha.'),
    // campo materno
    check('materno', 'El apellido materno es obligatorio.')
        .not().isEmpty()
        .isAlpha().withMessage('Solo debe contener caracteres alpha.'),
    // campo fecha_nacimiento
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatorio.')
        .not().isEmpty()
        .isDate().withMessage('El formato es YYYY/MM/DD o YYYY-MM-DD'),
    // campo email
    check('email', 'No es un Email valido.')
        .isEmail(),
    // campo nro_celular
    check('nro_celular', 'El numero de telefono es obligatorio')
        .not().isEmpty()
        .isNumeric().withMessage('El campo telefono solo debe contener caracteres numericos.'),
    // Ejecutar
    validarCampos,
];

// inicializar Router de express
const router = Router();

// obtener todas las personas
router.get('/', obtenerPersonas);

// obtener una sola persona
router.get('/:id', obtenerUnaPersona);

router.post('/', validacionPersona, guardarPersona);

router.put('/:id/actualizar', validacionPersona, actualizarPersona);

router.put('/:id/eliminar', eliminarPersona);


// exportar rutas
module.exports = router;