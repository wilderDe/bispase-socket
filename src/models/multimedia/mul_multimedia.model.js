const { Sequelize } = require('sequelize');
const { sequelize } = require('../../database/conexion');

const mulMultimedia = sequelize.define('mul_multimedia', {
  mul_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mul_nombre_archivo: {
    type: Sequelize.STRING,
  },
  mul_localizacion: {
    type: Sequelize.STRING,
  },
  mul_descripcion: {
    type: Sequelize.STRING,
  },
  uploadedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
  },
  form_id: {
    type: Sequelize.INTEGER,
  },
  data_id: {
    type: Sequelize.INTEGER,
  }
}, {
  timestamps: false,
  tableName: 'mul_multimedia',
  schema: 'multimedia',
});

module.exports = {
  mulMultimedia,
}