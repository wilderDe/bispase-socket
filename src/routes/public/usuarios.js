// importar router de express
const { Router } = require('express');

// importar funciones de controlador Usuario
const {
    obtenerUsuario,
    obtenerUnUsuario,
    guardarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    pruebaRelaciones,
    listarUsuInternosEntidad
} = require('../../controllers/public/usuarios.controller')

// inicializar Router de express
const router = Router();

router.get('/', obtenerUsuario);

router.get('/:id', obtenerUnUsuario);

router.get('/entidad/:ent_id', listarUsuInternosEntidad)

router.post('/', guardarUsuario);

router.put('/:id/actualizar', actualizarUsuario);

router.put('/:id/eliminar', eliminarUsuario);


router.get('/usuario-datos/todo', pruebaRelaciones);
// exportar rutas
module.exports = router;