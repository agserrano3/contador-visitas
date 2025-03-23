// server.js
const path = require("path");
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

// Configurar Remix handler para manejar las rutas
app.all(
  "*",
  createRequestHandler({
    build: require("./build"),
    mode: process.env.NODE_ENV
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});