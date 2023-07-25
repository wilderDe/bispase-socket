// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('../../database/conexion');


const Entidad = sequelize.define('ent_entidades', {
    ent_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre_entidad: {
        type: Sequelize.STRING
    },
    ruta_logo: {
        type: Sequelize.STRING
    },
    prefijo: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    tic_id: {
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
}, {
    timestamps: false,
    tableName: 'ent_entidades'
});

module.exports = {
    Entidad
}
