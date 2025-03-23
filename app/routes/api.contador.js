import { json } from "@remix-run/node";
import { obtenerContador, incrementarContador } from "~/models/contador.server";

// Endpoint GET para obtener el valor actual
export const loader = async () => {
  console.log("API Contador loader ejecutándose");
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
  console.log("API Contador action ejecutándose");
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