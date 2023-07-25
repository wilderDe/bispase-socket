const { response, request } = require("express");

// importar logger para registro de eventos
const logger = require('../../../utils/loggers/logger-config');
// opciones de loggers
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6

// importar paquete de encriptacion
const bcrypt = require('bcryptjs');

// importacion de helpers
const { generarJWT } = require("../../../helpers/generar_jwt");

// importacion de modelos
const { Usuario } = require("../../../models/public/usuario.model");
const { Perfil } = require("../../../models/public/perfil.model");
const { Entidad } = require("../../../models/public/entidad.model");
const { Persona } = require("../../../models/public/persona.model");


const login = async (req = request, res = response) => {
    const {
        nombre_usuario,
        contrasenia,
        usuario_entidad
    } = req.body;

    try {

        // verificar si el nombre de usuario existe
        const usuario = await Usuario.findAll({
            where: {
                nombre_usuario: nombre_usuario,
                estado: 's',
            },
            attributes: ['usu_id', 'nombre_usuario', 'per_id', 'estado', 'contrasenia', 'user_created'],
            include: [
                {
                    model: Perfil,
                    attributes: ['perf_id', 'nombre_perfil','prefijo', 'estado'],
                    where: {
                        ent_id: usuario_entidad,
                    },
                    include: {
                        model: Entidad,
                        attributes: ['ent_id', 'nombre_entidad', 'prefijo', 'tic_id', 'estado'],
                        where: {
                            tic_id: 1,
                        }
                    },
                },
                {
                    attributes: ['nombre','paterno','materno'],
                    model: Persona
                }
            ],
        });

        // verificar si existe en nombre de usuario
        if (!usuario[0]) {
            logger.info(`Un usuario intento iniciar sesión con un nombre de usuario incorrecta.`);
            return res.status(400).json({
                // msg: 'Nombre Usuario / Contraseña no son correctos - nombre usuario'
                msg: 'Nombre Usuario / Contraseña no son correctos'
            });
        }

        // verificar si la entidad esta activo
        if (usuario[0].perf_perfiles[0].ent_entidade.estado == "n") {
            logger.info(`El Usuario: ${usuario[0].nombre_usuario} intentando ingresar a una entidad que ya no existe.`);
            return res.status(400).json({
                msg: 'La entidad No existe'
            });
        }

        // console.log(usuario[0].estado);

        // verificar si el usuario esta activo
        if (usuario[0].estado == "n") {
            logger.info(`El usuario: ${usuario[0].nombre_usuario} que esta inactivo intento iniciar sesión.`);
            return res.status(400).json({
                // msg: 'Nombre Usuario / Contraseña no son correctos. - estado'
                msg: 'Nombre Usuario / Contraseña no son correctos.'
            });
        }



        // verificar la contraseña
        const validarContraseña = bcrypt.compareSync(contrasenia, usuario[0].contrasenia);

        if (!validarContraseña) {
            logger.info(`El usuario: ${usuario[0].nombre_usuario} intento iniciar sesión con una contraseña incorrecta.`);
            return res.status(400).json({
                // msg: 'Nombre Usuario / Contraseña no son correctos - password'
                msg: 'Nombre Usuario / Contraseña no son correctos'
            });
        }

        // generar el JWT
        // console.log(usuario[0].perf_perfiles[0].ent_entidade.ent_id);
        const token = await generarJWT(usuario[0].usu_id, usuario[0].perf_perfiles[0].ent_entidade.ent_id);

        logger.info(`El usuario: ${usuario[0].nombre_usuario} inicio sesión correctamente.`);

        res.status(200).json({
            ok: true,
            msg: 'Usuario Autenticado.',
            usuario: {
                usu_id: usuario[0].usu_id,
                nombre_usuario: usuario[0].nombre_usuario,
                nombre:usuario[0].per_persona.nombre,
                paterno:usuario[0].per_persona.paterno,
                materno:usuario[0].per_persona.materno,
                per_id: usuario[0].per_id,
                ent_id: usuario[0].perf_perfiles[0].ent_entidade.ent_id,
                prefijo_entidad: usuario[0].perf_perfiles[0].ent_entidade.prefijo,
                nombre_perfil: usuario[0].perf_perfiles[0].nombre_perfil,
                nombre_perfil_prefijo: usuario[0].perf_perfiles[0].prefijo,
                estado: usuario[0].estado,
                user_created: usuario[0].user_created
            },
            token,
            // ver: usuario,
            // perfil: usuario[0].perf_perfiles[0].nombre_perfil
        });


    } catch (error) {
        console.log(error);
        logger.error(`intento de iniciar sesión fallido, ocurrio un error de servidor. | error: ${error}`);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor hable con el administrador',
        });
    }
};

const revalidarToken = async (req = request, res = response) => {

    // Lo que nos retora del middleware validar_jwt
    const usuario = req.usuario;

    // vuelve a generar el JWT
    const token = await generarJWT(usuario.usu_id, usuario.perf_perfiles[0].ent_entidade.ent_id);

    return res.json({
        ok: true,
        msg: 'revalidado',
        usuario,
        token
    })
}

module.exports = {
    login,
    revalidarToken
}