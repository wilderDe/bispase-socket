const { hashSync } = require('bcryptjs');

const nombreArchivo = (nombre) => {
  const nombreEncriptado = hashSync(nombre, 8).slice(0, 20);
  return nombreEncriptado.replaceAll(/\//g, '$').replaceAll(/\\./g, '$');
}

module.exports = {
  nombreArchivo
};