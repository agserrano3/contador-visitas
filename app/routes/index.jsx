// app/routes/index.jsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
const { obtenerContador } = require("~/models/contador.server");

export const loader = async () => {
  const valorContador = obtenerContador();
  return json({ contador: valorContador });
};

export default function Index() {
  const { contador } = useLoaderData();
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Contador de Visitas</h1>
      <p>Esta página ha sido visitada <strong>{contador}</strong> veces.</p>
      <p>
        Este es el panel de administración del contador. El widget externo 
        se conecta a la API para mostrar este valor en otros sitios web.
      </p>
    </div>
  );
}