// importamos response y request de express
const { request, response } = require('express');

// importar logger para registro de eventos
const logger = require('../../utils/loggers/logger-config');
// opciones de loggers
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6

// importar modelo
const { Persona } = require('../../models/public/persona.model');

// procedimientos segun protocolo HTTP
const obtenerPersonas = async (req = request, res = response) => {
    try {
        const personas = await Persona.findAll()

        res.status(200).json({
            code: 200,
            data: personas,

        })
        // registro de logger
        logger.info('obtener listado de todas las todas las personas ');

    } catch (error) {
        logger.error('Error al intentar consultar toda la lista de personas');
        res.status(500).json({
            code: 500,
            msg: 'Error de Servidor',
            error
        })
    }

}

const obtenerUnaPersona = async (req = request, res = response) => {

    const { id } = req.params;
    try {

        const personas = await Persona.findOne({
            where: {
                per_id: id
            }
        });

        res.status(200).json({
            ok: true,
            data: personas
        });

        logger.info('obtener datos de una persona ');

    } catch (error) {
        logger.error('Error al intentar consultar datos de una person');
        res.status(500).json({
            ok: false,
            msg: "Error de Servidor.",
            error: error,
            id
        })
    }
}

const guardarPersona = async (req = request, res = response) => {

    const {
        nombre,
        paterno,
        materno,
        ci,
        expedido,
        fecha_nacimiento,
        email,
        nro_celular,
        user_created
    } = req.body;
    
    const usuarioAuntenticado = req.usuario;

    try {
        const nuevaPersona = await Persona.create({
            nombre,
            paterno,
            materno,
            ci,
            expedido,
            fecha_nacimiento,
            email,
            nro_celular,
            estado: "s",
            created_at: new Date().toLocaleString(),
            user_created
        }, {
            fields: [
                'nombre',
                'paterno',
                'materno',
                'ci',
                'expedido',
                'fecha_nacimiento',
                'email',
                'nro_celular',
                'estado',
                'created_at',
                'user_created'
            ]
        });

        if (nuevaPersona) {
            res.status(200).json({
                ok: true,
                msg: 'Persona registrada con éxito.',
                // data: nuevaPersona,
                // usuarioAuntenticado
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error de servidor Comuniquese con Administrador",
            error: error
        })
    }
}

const actualizarPersona = async (req = request, res = response) => {
    const {
        id
    } = req.params;

    const {
        nombre,
        paterno,
        materno,
        fecha_nacimiento,
        email,
        nro_celular,
        estado,
        updated_at,
        user_created
    } = req.body;

    try {

        const persona = await Persona.update({
            nombre,
            paterno,
            materno,
            fecha_nacimiento,
            email,
            nro_celular,
            estado,
            updated_at,
            user_created
        }, {
            where: {
                id
            }
        })

        res.status(200).json({
            ok: true,
            msg: 'Persona actualado correctamente.',
            // data: persona
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor al momento de actualizar Persona.',
            error: error
        });
    }
}

const eliminarPersona = async (req = request, res = response) => {

    const {
        estado,
        updated_at,
        user_created
    } = req.body;

    const {
        id
    } = req.params;

    try {

        const eliminarPersona = await Persona.update({
            estado,
            updated_at,
            user_created
        }, {
            where: {
                id
            }
        })
        res.status(200).json({
            ok: true,
            msg: 'Se Elimino el Registro de una Persona',
            // data: eliminarPersona
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor al momento de eliminar una persona.',
            error
        });
    }

}


module.exports = {
    obtenerPersonas,
    obtenerUnaPersona,
    guardarPersona,
    actualizarPersona,
    eliminarPersona
}

// logger implementar 