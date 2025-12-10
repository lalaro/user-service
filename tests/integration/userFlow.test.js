const request = require("supertest")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const app = require("../../app")
const User = require("../../src/models/User")

let mongo

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoose.connect(uri)
})

beforeEach(async () => {
  await User.deleteMany()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongo.stop()
})

describe("Flujo completo de usuarios", () => {

  let token
  let userId

  test("1. registrar usuario", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        documentType: "CC",
        documentNumber: "1",
        firstName: "Juan",
        lastName: "Perez",
        username: "juan",
        birthDate: "2000",
        gender: "M",
        phone: "123",
        address: "Calle",
        email: "test@test.com",
        password: "12345",
        age: "24",
        weight: "70",
        height: "175",
        workMode: "home"
      })

    expect(res.status).toBe(200)
  })

  test("2. login", async () => {
    // Registrar antes del login
    await request(app)
      .post("/api/auth/register")
      .send({
        documentType: "CC",
        documentNumber: "1",
        firstName: "Juan",
        lastName: "Perez",
        username: "juan",
        birthDate: "2000",
        gender: "M",
        phone: "123",
        address: "Calle",
        email: "test@test.com",
        password: "12345",
        age: "24",
        weight: "70",
        height: "175",
        workMode: "home"
      })

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "12345" })

    expect(res.status).toBe(200)
    token = res.body.token
  })

  test("3. obtener lista de usuarios", async () => {
    // Registrar y loguear
    await request(app)
      .post("/api/auth/register")
      .send({
        documentType: "CC",
        documentNumber: "1",
        firstName: "Juan",
        lastName: "Perez",
        username: "juan",
        birthDate: "2000",
        gender: "M",
        phone: "123",
        address: "Calle",
        email: "test@test.com",
        password: "12345",
        age: "24",
        weight: "70",
        height: "175",
        workMode: "home"
      })

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "12345" })

    token = login.body.token

    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)

    userId = res.body[0]._id
  })

  test("4. obtener usuario por ID", async () => {
    // Registrar + login + obtener lista
    await request(app).post("/api/auth/register").send({
      documentType: "CC",
      documentNumber: "1",
      firstName: "Juan",
      lastName: "Perez",
      username: "juan",
      birthDate: "2000",
      gender: "M",
      phone: "123",
      address: "Calle",
      email: "test@test.com",
      password: "12345",
      age: "24",
      weight: "70",
      height: "175",
      workMode: "home"
    })

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "12345" })

    token = login.body.token

    const users = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)

    userId = users.body[0]._id

    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.email).toBe("test@test.com")
  })
})