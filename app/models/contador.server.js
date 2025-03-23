// app/models/contador.server.js
let contador = 0;

// En una aplicación real, usarías una base de datos
// Este es un ejemplo simplificado con almacenamiento en memoria
function obtenerContador() {
  return contador;
}

function incrementarContador() {
  contador += 1;
  return contador;
}

export {
  obtenerContador,
  incrementarContador
};