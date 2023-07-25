const { request, response } = require('express');
const jwt = require('jsonwebtoken');

// import de modelos
const { Persona } = require('../models/public/persona.model');
const { Usuario } = require('../models/public/usuario.model');
const { Perfil } = require('../models/public/perfil.model');
const { Entidad } = require('../models/public/entidad.model');
const { Area } = require('../models/public/area.model');

const validarJWT = async (req = request, res = response, next) => {



    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json(
          {
            msg: 'No hay token en la peticion.',
          }
        )
    }

    try {

        const payload = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        console.log(payload);

        // console.log(typeof payload.id);
        // leer el usuario que coorresponde al uid

        // const usuario = await Usuario.findByPk(payload.id, {
        //     attributes: ['usu_id','nombre_usuario', 'estado'],
        //     include: {
        //         model: Persona,
        //         attributes: ['per_id', 'nombre', 'paterno', 'materno', 'ci', 'expedido', 'fecha_nacimiento', 'email', 'nro_celular', 'estado'],
        //     }
        // });

        const usuario = await Usuario.findAll({
            where: {
                usu_id: payload.id
            },
            attributes: ['usu_id', 'nombre_usuario', 'estado'],
            include: [
                {
                    model: Persona,
                    attributes: ['per_id', 'nombre', 'paterno', 'materno', 'ci', 'expedido', 'fecha_nacimiento', 'email', 'nro_celular', 'estado'],
                },
                {
                    model: Perfil,
                    where: {
                        ent_id: payload.entidad_id
                    },
                    attributes: ['perf_id', 'nombre_perfil', 'descripcion', 'prefijo', 'estado'],
                    include:[
                        {
                            model: Entidad,
                            attributes: ['ent_id', 'nombre_entidad', 'ruta_logo', 'prefijo', 'descripcion','tic_id', 'estado'],
                        },
                        {
                            model: Area,
                            attributes: ['are_id', 'nombre_area', 'prefijo', 'estado'],
                        }
                    ]
                },
            ]
        });

        // console.log(usuario[0]);

        // verificar si existe el usuario
        if (!usuario[0]) {
            return res.status(401).json({
                msg: 'Usuario no exitente.'
            });
        }

        // verificar si el id de usuario habilitado "s"
        if (usuario[0].estado == 'n') {
            return res.status(401).json({
                msg: 'Usuario sin acceso al sistema. '
            });
        }

        // req.iduser = payload.id;
        req.usuario = usuario[0];

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            msg: 'Token no valido.',
            error
        })
    }

}

module.exports = {
    validarJWT
}
