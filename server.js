// server.js
import express from "express";
import cors from "cors";
import { createRequestHandler } from "@remix-run/express";

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

// Configurar Remix handler para manejar las rutas
app.all(
  "*",
  async (req, res, next) => {
    const build = await import("./build/index.js");
    return createRequestHandler({
      build,
      mode: process.env.NODE_ENV
    })(req, res, next);
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});