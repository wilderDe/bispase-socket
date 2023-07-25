// importar Sequelize
const {
    Sequelize
} = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const {
    sequelize
} = require('../../database/conexion');


const Historial = sequelize.define('his_historial', {
    his_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    accion: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    usuario_afectado: {
        type: Sequelize.INTEGER
    },
    contrasenia_anterior: {
        type: Sequelize.STRING
    },
    direccion_ip: {
        type: Sequelize.STRING
    },
    navegador: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.INTEGER
    },
    created_at: {
        type: Sequelize.STRING
    },
    updated_at: {
        type: Sequelize.STRING
    },
    usu_id: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false,
    tableName: 'his_historial'
});

module.exports = {
    Historial
}
