// server.cjs
const express = require("express");
const cors = require("cors");
const { createRequestHandler } = require("@remix-run/express");

const app = express();

// Configurar CORS para permitir solicitudes desde cualquier origen
// En producción, deberías limitarlo a dominios específicos
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// Servir archivos estáticos desde public
app.use(express.static("public"));

// Iniciar el servidor y luego cargar el build
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// Cargar el build como un módulo ES y configurar el handler
(async function() {
  try {
    const build = await import("./build/index.js");
    
    app.all(
      "*",
      createRequestHandler({
        build,
        mode: "development"
      })
    );
    
    console.log("Build cargado correctamente");
  } catch (error) {
    console.error("Error al cargar el build:", error);
    server.close();
    // process.exit(1);
  }
})(); 