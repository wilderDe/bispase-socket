// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('../../database/conexion');

const Acceso = sequelize.define('acc_accesos', {
    acc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    usu_id: {
        type: Sequelize.INTEGER
    },
    intentos: {
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
}, {
    timestamps: false,
    tableName: 'acc_accesos'
});

module.exports = {
    Acceso
}
