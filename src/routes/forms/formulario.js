const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar_campos');
const { validarJWT } = require('../../middlewares/validar_jwt');
const {
    listarFormularios,
    listarFormulario,
    guardarFormulario,
    actualizarFormulario,
    habilitarFormulario,
    deshabilitarFormulario,
    eliminarFormulario,
    cargarDatosGeograficos
} = require('../../controllers/forms/forms.controller')
const router = Router();
router.get('/', listarFormularios);
router.get('/:id', listarFormulario);
router.post('/', guardarFormulario);
router.put('/:id', actualizarFormulario);
router.put('/habilitar/:id/:usu_id', habilitarFormulario)
router.put('/deshabilitar/:id/:usu_id', deshabilitarFormulario)
router.delete('/eliminar/:id', eliminarFormulario)
//geografico
router.get('/cargarDatosGeograficos/:form_id', cargarDatosGeograficos);
module.exports = router;