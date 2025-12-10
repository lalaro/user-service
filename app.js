process.env.NODE_ENV = process.env.NODE_ENV || "development"
require("dotenv").config()

const express = require("express")
const connectDB = require("./src/config/db")

const app = express()
app.use(express.json())

// CONEXIÓN A BD: NO CONECTAR SI ESTAMOS EN JEST
if (!process.env.JEST_WORKER_ID) {
connectDB()
}

// Rutas
app.use("/api/users", require("./src/routes/userRoutes"))
app.use("/api/auth", require("./src/routes/authRoutes"))

// Exportar app para supertest
module.exports = app

// Solo iniciar el servidor si NO estamos en pruebas
if (!process.env.JEST_WORKER_ID) {
app.listen(process.env.PORT, () => {
console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
}