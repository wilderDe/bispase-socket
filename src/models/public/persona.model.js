// importar Sequelize
const Sequelize = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const {
    sequelize
} = require('../../database/conexion');

const Persona = sequelize.define('per_personas', {
    per_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    paterno: {
        type: Sequelize.STRING
    },
    materno: {
        type: Sequelize.STRING
    },
    ci: {
        type: Sequelize.STRING
    },
    expedido: {
        type: Sequelize.STRING
    },
    fecha_nacimiento: {
        type: Sequelize.STRING
    },
    sexo: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    nro_celular: {
        type: Sequelize.STRING
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
    tableName: 'per_personas'
})


module.exports = {
    Persona
}