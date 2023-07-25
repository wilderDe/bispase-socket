// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('../../database/conexion');


const PerfilMenu = sequelize.define('pem_perfil_menus', {
    pem_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    men_id: {
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
    tableName: 'pem_perfil_menus'
});

module.exports = {
    PerfilMenu
}
