// app/routes/api/contador.js
import { json } from "@remix-run/node";
const { obtenerContador, incrementarContador } = require("~/models/contador.server");

// Endpoint GET para obtener el valor actual
export const loader = async () => {
  const valorContador = obtenerContador();
  
  return json(
    { contador: valorContador },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    }
  );
};

// Endpoint POST para incrementar el contador
export const action = async () => {
  const nuevoValor = incrementarContador();
  
  return json(
    { contador: nuevoValor },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    }
  );
};