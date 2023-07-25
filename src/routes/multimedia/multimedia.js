const router = require('express').Router();

/** MIDDLEWARES */
const { validarJWT } = require('../../middlewares/validar_jwt');
const multer = require('../../middlewares/multer');

/** CONTROLLERS */
const multimedia = require('../../controllers/multimedia/multimedia.controller');

/** RUTAS */

/** RUTAS GET */
router.get('/:form_id', multimedia.obtenerMultimedia);

/** RUTAS POST */
router.post('/img/:form_id/:data_id', multer.subirImagenes, multimedia.subirImagenes);
router.post('/videos/:form_id/:data_id', multer.subirVideos, multimedia.subirVideos);

/** RUTAS DELETE */
router.delete('/eliminar/:mul_id', multimedia.eliminarArchivoMultimedia);

module.exports = router;