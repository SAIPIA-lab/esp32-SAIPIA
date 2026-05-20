const express = require("express");
const cors = require("cors");

const app = express();

const PORT =
process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let estadoActual = {};
let historial = [];

// Recibir datos ESP32
app.post("/estado", (req, res) => {

  estadoActual = {
    ...req.body,
    timestamp: new Date()
  };

  historial.push(estadoActual);

  console.log("Datos:", estadoActual);

  res.json({
    ok: true
  });
});

// Estado actual
app.get("/estado", (req, res) => {

  res.json(estadoActual);
});

// Historial
app.get("/historial", (req, res) => {

  res.json(historial);
});

app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `Servidor corriendo en puerto ${PORT}`
  );
});