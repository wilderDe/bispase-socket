const { mulMultimedia } = require('../multimedia/mul_multimedia.model');
const { formFormularios } = require('./form_formularios.model');

formFormularios.hasMany(mulMultimedia, {
  foreignKey: "form_id",
  sourceKey: "form_id",
});
mulMultimedia.belongsTo(formFormularios, {
  foreignKey: "form_id",
  sourceKey: "form_id",
});