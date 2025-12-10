const request = require("supertest")
const express = require("express")

const userRoutes = require("../../src/routes/userRoutes")
const userController = require("../../src/controller/userController")
const authMiddleware = require("../../src/middleware/authMiddleware")

jest.mock("../../src/controller/userController")
jest.mock("../../src/middleware/authMiddleware")

// Fuerza a que el middleware siempre permita el paso
authMiddleware.mockImplementation((req, res, next) => next())

const app = express()
app.use(express.json())
app.use("/users", userRoutes)

describe("User Routes", () => {

test("GET /users debe devolver usuarios", async () => {
userController.getUsers.mockImplementation((req, res) => {
res.json([{ username: "juan" }])
})

const res = await request(app).get("/users")

expect(res.status).toBe(200)
expect(res.body).toEqual([{ username: "juan" }])
})

test("GET /users/:id debe devolver usuario", async () => {
userController.getUserById.mockImplementation((req, res) => {
res.json({ id: req.params.id, username: "pepe" })
})

const res = await request(app).get("/users/123")

expect(res.status).toBe(200)
expect(res.body).toEqual({ id: "123", username: "pepe" })
})

test("PUT /users/:id debe actualizar usuario", async () => {
userController.updateUser.mockImplementation((req, res) => {
res.json({ id: req.params.id, ...req.body })
})

const res = await request(app)
  .put("/users/123")
  .send({ username: "nuevo" })

expect(res.status).toBe(200)
expect(res.body).toEqual({ id: "123", username: "nuevo" })
})

test("DELETE /users/:id debe eliminar usuario", async () => {
userController.deleteUser.mockImplementation((req, res) => {
res.json({ message: "Usuario eliminado" })
})

const res = await request(app).delete("/users/123")

expect(res.status).toBe(200)
expect(res.body.message).toBe("Usuario eliminado")
})

})