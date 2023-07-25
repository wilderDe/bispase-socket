// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('../../database/conexion');


const Usuario = sequelize.define('usu_usuarios', {
    usu_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre_usuario: {
        type: Sequelize.STRING
    },
    contrasenia: {
        type: Sequelize.STRING
    },
    per_id: {
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
    tableName: 'usu_usuarios'
});

module.exports = {
    Usuario
}