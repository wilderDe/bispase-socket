const { request, response } = require("express");
const { sequelize } = require("../../database/conexion");
const logger = require("../../utils/loggers/logger-config");
const { QueryTypes } = require("sequelize");
const {
    formFormularios,
} = require("../../models/forms/form_formularios.model");
const listarFormularios = async(req = request, res = response) => {
    try {
        const listarFormularios = await formFormularios.findAll({
            // where: {
            //     prom_estado: 's'
            // },
            order: [
                ["form_id", "DESC"]
            ],
        });
        if (listarFormularios.length > 0) {
            res.status(200).json({
                ok: true,
                data: listarFormularios,
                msg: "listado de Formularios",
            });
            logger.info("obtener listado de todas los formularios");
        } else {
            res.status(404).json({
                ok: true,
                msg: "No existen registros",
            });
        }
    } catch (error) {
        logger.error("Error al intentar consultar tabla formularios");
        res.status(500).json({
            code: 500,
            msg: "Error de Servidor",
        });
    }
};
const listarFormulario = async(req = request, res = response) => {
    try {
        const { id } = req.params;

        const formulario = await formFormularios.findOne({
            where: {
                form_id: id,
            },
            order: [
                ["form_id"]
            ],
        });
        res.status(200).json({
            ok: true,
            data: formulario,
            msg: "listar un Formulario",
        });
    } catch (error) {
        logger.error(
            "Error al intentar consultar un registro de la tabla Formularios"
        );
        res.status(500).json({
            code: 500,
            msg: "Error de Servidor ",
        });
    }
};

const actualizarTableNameFormulario = async(id, tableName) => {
    try {
        const formulario = await formFormularios.findOne({ where: { form_id: id } })
        if (!formulario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un formulario'
            })
        }
        formulario.form_table_name = tableName;
        await formulario.save();
    } catch (error) {
        logger.error("Error de servidor", error);
        res.status(500).json({
            code: 500,
            msg: "Error de Servidor ",
            error,
        });
    }
}
const createTable = async(formulario, values) => {
    try {
        const tableName = 'form_Data_' + formulario.form_id;
        // let fields = values.map(field => field.name + " varchar(255)").toString();
        let fields = values.filter(value => value.type != 'button').map(field => field.key + " varchar(255)").toString();
        console.log(fields);
        //creacion de tabla
        const crearTabla = await sequelize.query(`create table forms.${tableName}(data_id serial constraint ${tableName}_id_pk primary key,
                                                    geom geometry,
                                                    ${fields}, form_id integer default ${formulario.form_id}, 
                                                    estado varchar(1),fecha_creacion timestamp(6),
                                                    fecha_actualizacion timestamp(6),usu_id integer);`, { type: QueryTypes.create });

        //const alterar_columna = await sequelize.query(`ALTER TABLE forms.${tableName} ALTER COLUMN geom TYPE geometry USING geom::geometry;`, { type: QueryTypes.alterTable });
        await actualizarTableNameFormulario(formulario.form_id, tableName);
    } catch (error) {
        logger.error("Error al intentar guardar registro de la tabla Formularios");
        res.status(500).json({
            code: 500,
            msg: "Error de Servidor ",
            error,
        });
    }
}
const guardarFormulario = async(req = request, res = response) => {
    console.log(req.body);
    try {
        const form_title = req.body.form_title;
        const form_description = req.body.form_description;
        const form_geometria = req.body.form_geometria;
        const form_schema = JSON.stringify(req.body);
        const usu_id = req.body.usu_id;
       
        const nuevoFormulario = await formFormularios.create({
            form_title,
            form_description,
            form_geometria,
            form_schema,
            usu_id,
            form_fecha_creacion: new Date().toLocaleString(),

        }, {
            fields: ["form_title", "form_description", "form_geometria", "form_schema", "usu_id", "form_fecha_creacion"],
        });

        await createTable(nuevoFormulario, req.body.form_schema.components);
        console.log(req.body.form_schema.components);

        res.status(200).json({
            ok: true,
            data: nuevoFormulario,
            msg: "Formulario Guardado correctamente.",
        });
    } catch (error) {
        logger.error("Error al intentar guardar formulario registro de la tabla Formularios");
        res.status(500).json({
            code: 500,
            msg: "Error de Servidor ",
            error,
        });
    }
};
const actualizarFormulario = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const form_title = req.body.form_title;
        const form_description = req.body.form_description;
        const form_geometria = req.body.form_geometria;
        const { form_schema } = req.body;
        const usu_id = req.body.usu_id;
        // console.log("form_schemassss", form_schema);
        //recuperando datos del formulario anterior
        const formularioAnt = await formFormularios.findOne({ where: { form_id: id } });
        // console.log(formularioFields.form_schema);
        //guardando en datos1 los nuevos campos
        let datos1 = form_schema.components;
        console.log("Datos 1", datos1);
        //array con los datos anteriores del formulario
        const datos2 = formularioAnt.form_schema
        console.log("Datos 2", datos2);
        // filtrando los datos que ya estan en el formulario
        const result = datos1.filter(el => !datos2.includes(el.key));
        console.log("resultado", result);
        //armando parte de la consulta para adicionar columnas
        let fields = result.map(field => "ADD COLUMN " + field.key + " varchar(255)").toString();
        console.log("CAMPOS", fields);


        //adicionando las columnas nuevas
        if (!fields) {

            console.log("No hay nuevos Columnas");
        } else {

            const alterTable = await sequelize.query(`alter table forms.${formularioAnt.form_table_name} ${fields};`, { type: QueryTypes.update });
        }

        const formulario = await formFormularios.findOne({ where: { form_id: id } })
            //si no existe el formulario muestra el siguiente mensaje
        if (!formulario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un formulario con ese ID'
            })
        }
        // //igualando los nuevos valores al objeto
        formulario.form_title = form_title;
        formulario.form_description = form_description;
        formulario.form_geometria = form_geometria;
        formulario.form_schema = JSON.stringify(req.body);
        formulario.usu_id = usu_id;
        formulario.form_fecha_actualizacion = new Date().toLocaleString(),
            await formulario.save();
        res.status(200).json({
            ok: true,
            // data: fields,
            data: formulario,
            msg: "Formulario Actualizado"
        });

    } catch (error) {
        logger.error("Error al intentar actualizar un Formulario");
        res.status(500).json({
            code: 500,
            msg: "Error de Servidor",
            error,
        });
    }
}
const habilitarFormulario = async(req = request, res = response) => {
    const { id, usu_id } = req.params;
    try {
        const formulario = await formFormularios.update({
            form_estado: 's',
            usu_id,
            form_fecha_actualizacion: new Date().toLocaleString(),
        }, {
            where: {
                form_id: id
            }
        })
        res.status(200).json({
            ok: true,
            // msg: `Se habilito el formulario: ${formulario.form_title}`,
            msg: 'Se habilito un formulario',
            data: formulario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor al momento de habilitar Formulario',
            error
        });
    }
}
const deshabilitarFormulario = async(req = request, res = response) => {
    const { id, usu_id } = req.params;
    try {
        const formulario = await formFormularios.update({
            form_estado: 'n',
            usu_id,
            form_fecha_actualizacion: new Date().toLocaleString(),
        }, {
            where: {
                form_id: id
            }
        })
        res.status(200).json({
            ok: true,
            msg: `Se deshabilito el formulario ${formulario.form_id}`,
            data: formulario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor al momento de habilitar Formulario',
            error
        });
    }
}
const eliminarTabla = async(formulario) => {
    //query para eliminar la tabla
    await sequelize.query(`drop table forms.${formulario.form_table_name};`, { type: QueryTypes.create });
}
const eliminarFormulario = async(req = request, res = response) => {
    const { id } = req.params;
    try {
        // buscando un formulario que coincida con el id
        const formulario = await formFormularios.findOne({ where: { form_id: id } })

        //si no existe formulario muestra la siguiente salida
        if (!formulario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un formulario con ese ID'
            })
        }
        //llamando a funcion para eliminar tabla
        eliminarTabla(formulario);
        await formulario.destroy({
                where: {
                    form_id: id
                }
            })
            //respuesta exitosa
        res.status(200).json({
            ok: true,
            msg: `Se elimino correctamente el formulario ${formulario.form_title}`,
            data: formulario
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor al momento de eliminar el formulario',
            error
        });
    }
}

const cargarDatosGeograficos = async (req = request, res = response) => {

    const { form_id } = req.params;
    try {

        const listar = await sequelize.query(
            `SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
            FROM (SELECT 'Feature' As type , ST_AsGeoJSON(lg.geom)::json As geometry, 
            row_to_json(lg.*) As properties 
            FROM  (select fd.*, mm.mul_localizacion from forms.form_data_${form_id} fd 
            left join multimedia.mul_multimedia mm on fd.data_id = mm.data_id and mm.form_id = :form_id
            where fd.form_id = :form_id ) As lg
            ) As f )  As fc;`,
            {
                replacements: { form_id },
                type: QueryTypes.SELECT
            })

        const ArrayIndicador_variable = [];
        listar.forEach(element => {
            ArrayIndicador_variable.push(element.row_to_json);
        });

        /** enviar el resutado en formato json*/
        res.status(200).json({
            ok: true,
            data: ArrayIndicador_variable
        })

        // registro de logger
        logger.info('obtener datos geograficos del formulario.')

    } catch (error) {
        // mostrar el error en consola
        console.log(error)
        // registrar logger de error
        logger.error('Error al intentar obtener datos geograficos')
        // enviar una respuesta json 
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor',
        })
    }
}

module.exports = {
    guardarFormulario,
    listarFormularios,
    listarFormulario,
    actualizarFormulario,
    habilitarFormulario,
    deshabilitarFormulario,
    eliminarFormulario,
    cargarDatosGeograficos
};