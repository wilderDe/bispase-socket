// importar Sequelize
const {Sequelize} = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const {sequelize} = require('../../database/conexion');


const Area = sequelize.define('are_areas', {
    are_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre_area: {
        type: Sequelize.STRING
    },
    prefijo: {
        type: Sequelize.STRING
    },
    // agregados fin
    id_padre: {
        type: Sequelize.INTEGER
    },
    nivel: {
        type: Sequelize.INTEGER
    },
    ent_id: {
        type: Sequelize.INTEGER
    },
    // agregados fin
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
    tableName: 'are_areas'
});

module.exports = {
    Area
}
