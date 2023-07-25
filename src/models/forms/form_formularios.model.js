// importar Sequelize
const { Sequelize, DataTypes } = require("sequelize");

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require("../../database/conexion");
const formFormularios = sequelize.define(
    "form_formularios", {
        form_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        form_title: {
            type: Sequelize.STRING,
        },
        form_description: {
            type: Sequelize.STRING,
        },
        form_geometria: {
            type: Sequelize.INTEGER,
        },
        form_schema: {
            type: Sequelize.STRING,
        },
        usu_id: {
            type: Sequelize.INTEGER,
        },
        form_estado: {
            type: Sequelize.STRING,
        },
        form_table_name: {
            type: Sequelize.STRING,
        },
        form_fecha_creacion: {
            type: Sequelize.STRING,
        },
        form_fecha_actualizacion: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false,
        tableName: "form_formularios",
        schema: "forms"
    }
);
module.exports = {
    formFormularios,
};