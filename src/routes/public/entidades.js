// importar router de express
const { Router } = require('express');

// importar check express-validator
const { check } = require('express-validator');

// importar la validacion de campos
const { validarCampos } = require('../../middlewares/validar_campos');
const { validarJWT } = require('../../middlewares/validar_jwt')

// importar funciones de controlador Entidades
const { obtenerEntidadesInternas, obtenerUnaEntidad, listarRestoDeEntidades } = require('../../controllers/public/entidades.controller');



// guardar en un array las validaciones de los campos de la referidas a la tabla ent_entidades
const validacionEntidad = [
    validarJWT,
    validarCampos,
];

// inicializar Router de express
const router = Router();

// PATH: /api/entidades
// obtener todas las personas
router.get('/listar-entidades-internas', obtenerEntidadesInternas);
router.get('/listar-entidad/:id', obtenerUnaEntidad);
router.get('/listar-resto-entidades/:ent_id_auth',validarJWT, listarRestoDeEntidades);


// exportar rutas
module.exports = router;