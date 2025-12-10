const request = require("supertest")
const express = require("express")
const authRoutes = require("../../src/routes/authRoutes")
const authService = require("../../src/services/authService")

jest.mock("../../src/services/authService")

const app = express()
app.use(express.json())
app.use("/auth", authRoutes)

describe("Auth Routes", () => {

test("POST /auth/login retorna 200 en login exitoso", async () => {
authService.login.mockResolvedValue({
token: "ABC123",
user: { id: "1", email: "test@test.com" }
})

const res = await request(app)
  .post("/auth/login")
  .send({ email: "test@test.com", password: "1234" })

expect(res.status).toBe(200)
expect(res.body.token).toBe("ABC123")
})

test("POST /auth/register retorna 200 en registro exitoso", async () => {
authService.register.mockResolvedValue({
id: "1",
email: "new@test.com"
})

const res = await request(app)
  .post("/auth/register")
  .send({ email: "new@test.com", password: "1234" })

expect(res.status).toBe(200)
expect(res.body.user.email).toBe("new@test.com")
})

test("POST /auth/login retorna 400 si falla el login", async () => {
authService.login.mockRejectedValue(new Error("Credenciales incorrectas"))

const res = await request(app)
  .post("/auth/login")
  .send({ email: "bad@test.com", password: "wrong" })

expect(res.status).toBe(400)
expect(res.body.error).toBe("Credenciales incorrectas")
})

})