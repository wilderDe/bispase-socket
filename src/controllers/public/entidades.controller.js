// importamos response y request de express
const { request, response } = require('express');

// importar logger para registro de eventos
const logger = require('../../utils/loggers/logger-config');

// importar modelo
const { Entidad } = require('../../models/public/entidad.model');
const { Op } = require('sequelize');

// obtener todos los usuarios
const obtenerEntidadesInternas = async (req = request, res = response) => {

    try {

        // tic_id = 1 -> interno
        const entidades = await Entidad.findAll({
            where: {
                estado: 's',
                tic_id: 1
            },
            attributes: ['ent_id', 'nombre_entidad', 'ruta_logo', 'prefijo', 'estado']
        });

        res.status(200).json({
            ok: true,
            data: entidades,
        });

    } catch (error) {

        console.log(error);
        // registro de logger
        logger.error('Error al intentar obtener lista de entidades internas.');

        res.status(500).json({
            ok: false,
            msg: 'Error de petición al servidor, al intentar consultar toda la lista de de usuarios.',
            error
        });
    }

}

// obtener lista de una entidad
const obtenerUnaEntidad = async (req = request, res = response) => {

    // pedir id de params
    const { id } = req.params;


    try {

        const entidad = await Entidad.findOne({
            attributes: ['ent_id', 'nombre_entidad', 'ruta_logo', 'prefijo', 'estado'],
            where: {
                ent_id: id
            }
        });

        res.status(200).json({
            ok: true,
            data: entidad
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de petición al servidor, al intentar consultar toda la lista de de usuarios.',
        });
    }

}

// listar todas las entidades menos la entidad del usuario que esta autenticado

const listarRestoDeEntidades = async (req = request, res = response) => {

    // pedir id de params
    const { ent_id_auth } = req.params;
    try {
        const listaEntidades = await Entidad.findAll({
            attributes: ['ent_id', 'nombre_entidad', 'prefijo'],
            where: {
                ent_id: {
                    [Op.ne]: ent_id_auth
                },
                estado: 's'
            }
        });

        res.json({
            ok: true,
            data: listaEntidades
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error De peticion al Servidor, al intentar consultar el resto de las entidades"
        });
    }
}


module.exports = {
    obtenerEntidadesInternas,
    obtenerUnaEntidad,
    listarRestoDeEntidades
}