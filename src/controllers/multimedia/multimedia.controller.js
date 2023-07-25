const { request, response } = require("express");
const fs = require('fs');
const path = require('path')
const logger = require("../../utils/loggers/logger-config");

/** MODELOS */
const { formFormularios } = require("../../models/forms/form_formularios.model");
const { mulMultimedia } = require("../../models/multimedia/mul_multimedia.model");

/** RUTAS */

/** RUTAS GET */
const obtenerMultimedia = async (req, res) => {
  const { form_id } = req.params;
  try {
    const formulario = await formFormularios.findByPk(form_id);
    const formularioArchivosMultimedia = await formulario.getMul_multimedia();
    res.json({ ok: true, data: formularioArchivosMultimedia });
  } catch (error) {
    logger.error('Error al intentar obtener archivos multimedia');
    res.status(500).json({ ok: false, msg: 'Error al intentar obtener archivos multimedia' });
  }
}

/** RUTAS POST */
const subirImagenes = async (req = request, res = response) => {
  const { form_id, data_id } = req.params;
  const imagenes = req.files;
  try {
   // const imagenesJSON = JSON.parse(imagenes);
    const formulario = await formFormularios.findByPk(form_id);
    const datosImagenes = [];
    for (let i = 0; i < imagenes.length; i++) {
      const datosImagen = imagenes[i];
      datosImagenes.push({
        mul_descripcion: datosImagen.mul_descripcion, 
        mul_nombre_archivo: req.files[i].originalname, 
        mul_localizacion: `multimedia/imagenes/${req.files[i]?.filename}`,
        data_id: data_id
      });
    }
    const registrosImagenes = await mulMultimedia.bulkCreate(datosImagenes);
    await formulario.addMul_multimedium(registrosImagenes);
    res.json({ ok: 'true', msg: 'Imágenes subidas correctamente!'});
  } catch (error) {
    console.log(error.message);
    logger.error('Error al intentar subir imágenes');
    res.status(500).json({ ok: false, msg: 'Error al intentar subir imágenes' });
  }
}

const subirVideos = async (req = request, res = response) => {
  const { form_id, data_id } = req.params;
  const videos = req.files;

  try {
    //const videosJSON = JSON.parse(videos)
    const formulario = await formFormularios.findByPk(form_id);
    const datosVideos = [];
    for (let i = 0; i < videos.length; i++) {
      const datosVideo = videos[i];
      datosVideos.push({
        mul_descripcion: datosVideo.mul_descripcion, 
        mul_nombre_archivo: req.files[i].originalname, 
        mul_localizacion: `multimedia/videos/${req.files[i]?.filename}`,
        data_id: data_id
      });
    }
    const registrosVideo = await mulMultimedia.bulkCreate(datosVideos);
    await formulario.addMul_multimedium(registrosVideo);
    logger.error('Videos subidos correctamente!');
    res.json({ ok: 'true', msg: 'Videos subidos correctamente!'})
  } catch (error) {
    console.log(error.message);
    logger.error('Error al intentar subir videos');
    res.status(500).json({ ok: false, msg: 'Error al intentar subir videos' });
  }
}

/** RUTAS DELETE */
const eliminarArchivoMultimedia = async (req = request, res = response) => {
  const { mul_id } = req.params;
  try {
    const archivoMultimedia = await mulMultimedia.findByPk(mul_id);
    if (!archivoMultimedia) {
      logger.error('El archivo multimedia no existe');
      res.json({ ok: true, msg: 'El archivo multimedia no existe' });
    }

    const ubicacionArchivoMultimedia = 
      path.join(__dirname, '../..', 'uploads/', archivoMultimedia.mul_localizacion);

    if (fs.existsSync(ubicacionArchivoMultimedia)){
      fs.unlinkSync(ubicacionArchivoMultimedia);
      await archivoMultimedia.destroy();
      logger.error('Archivo multimedia eliminado correctamente');
      return res.json({ ok: true, msg: 'Archivo multimedia eliminado correctamente' });
    }

    res.status(400).json({ ok: false, msg: 'El archivo multimedia ya se encuentra eliminado' });
  } catch (error) {
    logger.error('Error al intentar subir videos');
    res.status(500).json({ ok: false, msg: 'Error al intentar subir videos' });
  }
}

module.exports = {
  subirImagenes,
  subirVideos,
  obtenerMultimedia,
  eliminarArchivoMultimedia
}