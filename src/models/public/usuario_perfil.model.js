// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('../../database/conexion');


const UsuarioPerfil = sequelize.define('usp_usuario_perfiles', {
    usp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    usu_id: {
        type: Sequelize.INTEGER
    },
    perf_id: {
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
    tableName: 'usp_usuario_perfiles'
});

module.exports = {
    UsuarioPerfil
}
