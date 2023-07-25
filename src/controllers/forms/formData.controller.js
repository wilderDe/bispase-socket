const { request, response } = require("express");
const { sequelize } = require("../../database/conexion");
const logger = require("../../utils/loggers/logger-config");
const { QueryTypes } = require("sequelize");
// importar modelo
const {
    formFormularios,
} = require("../../models/forms/form_formularios.model");
//funcion para listar un Formulario por ID
const listarFormData = async(req = request, res = response) => {

    const { form_id, id } = req.params;
    try {
        //Encuentra un formulario 
        const formulario = await formFormularios.findOne({ where: { form_id } });
        if (!formulario) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un formData con ese ID'
            });
            return;
        }
        //query que realiza la consulta para listar un formulario
        const formData = await sequelize.query(`SELECT * FROM forms.${formulario.form_table_name} where data_id = ${id};`);
        console.log(`SELECT * FROM forms.${formulario.form_table_name} where data_id = ${id};`);
        res.status(200).json({
            ok: true,
            data: formData,
            msg: "listar un Dato de un Formulario"
        });
        logger.info("Obtener listado de un Formulario");
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor al momento de listar los datos del formulario',
            error
        });
    }
}

//funcion para listar todos los 
const listarFormsData = async(req = request, res = response) => {
    const { form_id } = req.params;
    try {
        //Encuentra un formulario con el form_id =form_id del params
        const formulario = await formFormularios.findOne({ where: { form_id } });
        //si no existe formulario muestra el siguiente mensaje
        if (!formulario) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un formData con ese ID'
            });
            return;
        }
        const formData = await sequelize.query(`SELECT * FROM forms.${formulario.form_table_name};`);
        console.log(`SELECT * FROM forms.${formulario.form_table_name};`);

        res.status(200).json({
            ok: true,
            data: formData,
            msg: "listar datos de tabla"
        });
        logger.info("Obtener listado de todos los registro de la tabla");
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor al momento de listar los datos del formulario',
            error
        });
    }

}
const actualizarFormData = async(req = request, res = response) => {
    const { id } = req.params
    const usu_id = req.body.form.usu_id;
    const { form_id, form_schema } = req.body.form;
    fields = form_schema.map(field => `${field.name}='${field.value}'`).toString()
        // values = form_schema.map(field => `'${field.value}'`).toString()
        // console.log("form_schema", form_schema);
        // console.log("form_name", fields);
        // console.log("form_values", values);
    try {
        const formulario = await formFormularios.findOne({ where: { form_id } });
        if (!formulario) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un formData con ese ID'
            });
            return;
        }
        const formData = await sequelize.query(`UPDATE forms.${formulario.form_table_name} SET ${fields}, fecha_actualizacion='${new Date().toLocaleString()}', usu_id=${usu_id} WHERE data_id = ${id}`);
        console.log(`UPDATE forms.${formulario.form_table_name} SET ${fields}, fecha_actualizacion='${new Date().toLocaleString()}', usu_id=${usu_id} WHERE data_id = ${id}`);
        res.status(200).json({
            ok: true,
            // data: formDataList,
            msg: "actualizar datos de tabla"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor al momento de actualizar datos del formulario',
            error
        });
    }


}
const guardarFormData = async(req = request, res = response) => {
    try {
        
        const usu_id = req.body.form.usu_id;
        const id = req.body.form.form_id;
        const values = req.body.form.form_schema.map(field => `'${field.value}'`).toString();
        const formulario = await formFormularios.findOne({ where: { form_id: id } });
        //let fields = (JSON.parse(formulario.form_schema).form_schema.components).map(field => field.key);
        // fields = fields.filter(field => field != "submit").toString();
        let fields = req.body.form.form_schema.map(field => `${field.name}`);
        //agregar update date
        const insertarFormData = await sequelize.query(`insert into forms.${formulario.form_table_name} (${fields}, estado,fecha_creacion, usu_id) values(${values},'s','${new Date().toLocaleString()}',${usu_id});`,{type: QueryTypes.INSERT})
        console.log(`insert into forms.${formulario.form_table_name} (${fields}, estado,fecha_creacion, usu_id) values(${values},'s','${new Date().toLocaleString()}',${usu_id});`)
        
        const [max_date, _] = await sequelize.query(`select max(data_id) as data_id from forms.${formulario.form_table_name}`,{raw: true});
        
        if (!formulario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un formulario'
            })
        }
        // console.log(formulario);
        res.status(200).json({
            ok: true,
            data: max_date[0].data_id,
            msg: "Datos guardados correctamente en form_id: "+id+" data_id: "+max_date[0].data_id
        });
    } catch (error) {
        logger.error("Error al intentar guardar registro de la tabla nombreTabla");
        res.status(500).json({
            code: 500,
            msg: "Error de Servidor ",
            error,
        });
    }
}

const habilitarFormData = async(req = request, res = response) => {
    const { id, usu_id } = req.params;
    const form_id = req.body.form_id
    try {
        const formulario = await formFormularios.findOne({ where: { form_id } })
        const formData = await sequelize.query(`UPDATE forms.${formulario.form_table_name} SET estado='s',fecha_actualizacion='${new Date().toLocaleString()}', usu_id=${usu_id} where data_id=${id};`);
        console.log(`UPDATE forms.${formulario.form_table_name} SET estado='s',fecha_actualizacion='${new Date().toLocaleString()}', usu_id=${usu_id} where data_id=${id};`);
        res.status(200).json({
            ok: true,
            data: formData,
            msg: "registro habilitado"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de Servidor al momento de habilitar el dato del formulario',
            error
        });
    }
}
const deshabilitarFormData = async(req = request, res = response) => {
    const { id, usu_id } = req.params;
    const { form_id } = req.body;
    try {
        const formulario = await formFormularios.findOne({ where: { form_id } })
        const formData = await sequelize.query(`UPDATE forms.${formulario.form_table_name} SET estado='n',fecha_actualizacion='${new Date().toLocaleString()}', usu_id=${usu_id} where data_id=${id};`);
        console.log(`UPDATE forms.${formulario.form_table_name} SET estado='n',fecha_actualizacion='${new Date().toLocaleString()}', usu_id=${usu_id} where data_id=${id};`);
        res.status(200).json({
            ok: true,
            data: formData,
            msg: "registro deshabilitado"
        });
    } catch (error) {
        res.status(200).json({
            ok: true,
            // data: formDataList,
            msg: "deshabilitar datos de tabla"
        });
    }
}

const eliminarFormData = async(req = request, res = response) => {
    const { form_id, id } = req.params;

    try {
        const formulario = await formFormularios.findOne({ where: { form_id } })
            // console.log(formulario.form_table_name);
        if (!formulario) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un formData con ese ID'
            });
            return;
        }
        const formData = await sequelize.query(`DELETE FROM forms.${formulario.form_table_name} where data_id=${id};`);
        console.log(`DELETE FROM forms.${formulario.form_table_name} where data_id=${id};`);
        res.status(200).json({
            ok: true,
            data: formData,
            msg: "registro eliminado"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor al momento de eliminar el formData',
            error
        });
    }
}


module.exports = {
    guardarFormData,
    listarFormData,
    listarFormsData,
    actualizarFormData,
    habilitarFormData,
    deshabilitarFormData,
    eliminarFormData
}