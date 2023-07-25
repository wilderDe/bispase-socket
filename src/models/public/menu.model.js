// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('../../database/conexion');


const Menu = sequelize.define('men_menus', {
    men_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    titulo_menu: {
        type: Sequelize.STRING
    },
    id_padre: {
        type: Sequelize.INTEGER
    },
    ruta: {
        type: Sequelize.STRING
    },
    enlace: {
        type: Sequelize.STRING
    },
    orden: {
        type: Sequelize.INTEGER
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
}, {
    timestamps: false,
    tableName: 'men_menus'
});

module.exports = {
    Menu
}
