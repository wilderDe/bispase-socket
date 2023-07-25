// importamos response y request de express
const { request, response } = require('express');

// importar modelo
const { Usuario } = require('../../models/public/usuario.model');

// libreria para encriptar
const bcryptjs = require('bcryptjs');

// importar logger para registro de eventos
const logger = require('../../utils/loggers/logger-config');

const { Perfil } = require('../../models/public/perfil.model');
const { Entidad } = require('../../models/public/entidad.model');
const { Area } = require('../../models/public/area.model');
const { Persona } = require('../../models/public/persona.model');
const { Op } = require('sequelize');

// obtener todos los usuarios
const obtenerUsuario = async (req = request, res = response) => {

    try {
        const usuarios = await Usuario.findAll({
            attributes: ['usu_id', 'nombre_usuario', 'per_id', 'estado']

        });

        res.status(200).json({
            ok: true,
            data: usuarios,
        });

        // registro de logger
        logger.info('obtener listado de todos los usuarios. ');

    } catch (error) {

        // registro de logger
        logger.error('Error al intentar consultar toda la lista de de usuarios.');

        res.status(500).json({
            ok: false,
            msg: 'Error de petición al servidor, al intentar consultar toda la lista de de usuarios.',
            error
        });
    }

}

// obtener solo un usuario tambien por entidad opcional
const obtenerUnUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    // para filtar por entidad
    const { ident } = req.query;

    if (ident) {
        usuario = await Usuario.findOne({
            attributes: ['usu_id', 'nombre_usuario', 'per_id', 'estado'],
            where: {
                usu_id: id
            },
            include: {
                attributes: ['perf_id', 'nombre_perfil'],
                model: Perfil,
                where: {
                    ent_id: ident
                }
            }
        })

        console.log(ident);

    } else {
        console.log('else');
        usuario = await Usuario.findOne({
            attributes: ['usu_id', 'nombre_usuario', 'per_id', 'estado'],
            where: {
                usu_id: id
            },
            include: {
                attributes: ['perf_id', 'nombre_perfil'],
                model: Perfil
            }
        })
    }


    res.status(200).json({
        ok: true,
        data: usuario
    });
}



// guardar un nuevo usuario
const guardarUsuario = async (req = request, res = response) => {

    try {

        // resivir datos 
        const {
            nombre_usuario,
            contrasenia,
            persona_id,
            user_created
        } = req.body;

        // verificar si email existe

        // saltos para encriptacion 10 por defecto
        const salt = bcryptjs.genSaltSync();
        // guardamos la contraseña encryptada en una variable
        const contrasenia_has = bcryptjs.hashSync(contrasenia, salt);

        const nuevoUsuario = await Usuario.create({
            nombre_usuario,
            contrasenia: contrasenia_has,
            per_id: persona_id,
            estado: 's',
            created_at: new Date().toLocaleString(),
            user_created
        }, {
            fields: [
                'nombre_usuario',
                'contrasenia',
                'per_id',
                'estado',
                'created_at',
                'user_created'
            ]
        });

        if (nuevoUsuario) {
            res.status(200).json({
                ok: true,
                msg: 'Usuario registrado con éxito.',
                // data: nuevoUsuario
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error de servidor, al intentar  registrar un usuario.",
            error: error
        })
    }
}

// actualizar un usuario
// TODO:realizar procedimiento para actualizado de usuario
const actualizarUsuario = async (req = request, res = response) => {

    const aqui = req.body;

    res.json({
        msg: 'post API - Controlador',
        aqui
    });
}

// eliminacion logica de un usuario
// TODO:realizar procedimiento para la eliminacion logica de usuario
const eliminarUsuario = async (req = request, res = response) => {
    res.json({
        msg: 'put API - Controlador'
    });
}


// preubas
const pruebaRelaciones = async (req = request, res = response) => {

    // forma 1 de llamar todo
    const usuarios = await Usuario.findAll({
        attributes: ['usu_id', 'nombre_usuario', 'estado'],
        through: {
            attributes: [/* list the wanted attributes here */]
        },
        include: [
            {
                model: Persona,
                attributes: [
                    'per_id',
                    'nombre',
                    'paterno',
                    'materno',
                    'ci',
                    'expedido',
                    'fecha_nacimiento',
                    'email',
                    'nro_celular',
                    'estado'
                ]
            },
            {
                model: Perfil,
                attributes: ['perf_id', 'nombre_perfil', 'descripcion', 'prefijo', 'estado'],
                include: [
                    {
                        model: Area,
                        attributes: ['are_id', 'nombre_area', 'prefijo', 'estado'],
                    },
                    {
                        model: Entidad,
                        attributes: ['ent_id', 'nombre_entidad', 'ruta_logo', 'descripcion', 'estado']
                    }
                ]
            }
        ],

    });

    // forma 2 de llamar todo 
    // const usuarios = await Usuario.findAll({ include: { all: true, nested: true }});

    res.status(200).json({
        ok: true,
        data: usuarios,
    });

}


// listar usuarios internos por entidad
const listarUsuInternosEntidad = async (req = request, res = response) => {

    try {

        // recibir id de la entidad
        const { ent_id } = req.params;

        // Recibe el id autenticado
        const { usuidauth } = req.query;

        if (usuidauth) {
            console.log(usuidauth + 'hola');

            usuariosEnt = await Usuario.findAll({
                attributes: ['usu_id', 'nombre_usuario', 'per_id', 'estado'],
                where: {
                    estado: 's',
                    usu_id: {
                        [Op.ne]: usuidauth
                    }
                },
                include: [
                    {
                        model: Persona,
                        attributes: ['nombre', 'paterno', 'materno'],
                    },
                    {
                        model: Perfil,
                        attributes: ['perf_id', 'nombre_perfil'],
                        where: {
                            ent_id
                        }
                    }
                ]
            });

        } else {
            console.log(usuidauth + 'holaaqui');

            usuariosEnt = await Usuario.findAll({
                attributes: ['usu_id', 'nombre_usuario', 'per_id', 'estado'],
                where: {
                    estado: 's'
                },
                include: [
                    {
                        model: Persona,
                        attributes: ['nombre', 'paterno', 'materno'],
                    },
                    {
                        model: Perfil,
                        attributes: ['perf_id', 'nombre_perfil'],
                        where: {
                            ent_id
                        }
                    }
                ]
            });
        }



        res.status(200).json({
            ok: true,
            data: usuariosEnt,
        });

        // registro de logger
        logger.info('obtener listado de todos los usuarios de una entidad.');

    } catch (error) {

        console.log(error);
        // registro de logger
        logger.error('Error al intentar consultar toda la lista de de usuarios.');

        res.status(500).json({
            ok: false,
            msg: 'Error de petición al servidor, al intentar consultar toda la lista de de usuarios.',
            error
        });
    }
}

module.exports = {
    obtenerUsuario,
    obtenerUnUsuario,
    guardarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    pruebaRelaciones,
    listarUsuInternosEntidad
}