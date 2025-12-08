const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();

const app = express();
app.use(express.json());

// Conectar BD
connectDB();

// Rutas
app.use("/api/users", require("./src/routes/userRoutes"));

app.use("/api/auth", require("./src/routes/authRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
);
