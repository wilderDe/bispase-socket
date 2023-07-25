const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar_campos');
const { validarJWT } = require('../../middlewares/validar_jwt');
const {
    guardarFormData,
    listarFormData,
    listarFormsData,
    actualizarFormData,
    habilitarFormData,
    deshabilitarFormData,
    eliminarFormData
} = require('../../controllers/forms/formData.controller');

const router = Router();
router.get('/:form_id', listarFormsData);
router.get('/:form_id/:id', listarFormData);
router.post('/', guardarFormData);
router.put('/:id', actualizarFormData);
router.put('/habilitar/:id/:usu_id', habilitarFormData);
router.put('/deshabilitar/:id/:usu_id', deshabilitarFormData);
router.delete('/eliminar/:form_id/:id', eliminarFormData);



module.exports = router;