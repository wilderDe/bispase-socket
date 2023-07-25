// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('../../database/conexion');


const Perfil = sequelize.define('perf_perfiles', {

    perf_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre_perfil: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    ent_id: {
        type: Sequelize.INTEGER
    },
    are_id: {
        type: Sequelize.INTEGER
    },
    prefijo: {
        type: Sequelize.STRING
    },
    nivel: {
        type: Sequelize.INTEGER
    },
    estado: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.STRING
    },
    updated_at: {
        type: Sequelize.STRING
    },
    user_created: {
        type: Sequelize.INTEGER
    },
    user_updated: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false,
    tableName: 'perf_perfiles'
});

module.exports = {
    Perfil
}
