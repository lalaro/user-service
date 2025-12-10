const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const userRepository = require("../../src/repository/userRepository")
const User = require("../../src/models/User")

let mongo

beforeAll(async () => {
mongo = await MongoMemoryServer.create()
const uri = mongo.getUri()
await mongoose.connect(uri)
})

afterAll(async () => {
await mongoose.disconnect()
await mongo.stop()
})

afterEach(async () => {
await User.deleteMany()
})

const baseUser = {
documentType: "CC",
documentNumber: "100",
firstName: "Juan",
lastName: "Perez",
username: "juanp",
birthDate: "2000-01-01",
gender: "M",
phone: "123",
address: "Calle 1",
email: "juan@test.com",
password: "12345",
age: "24",
weight: "70",
height: "175",
workMode: "home"
}

describe("userRepository", () => {

test("crear usuario", async () => {
const user = await userRepository.crear(baseUser)
expect(user.email).toBe("juan@test.com")
})

test("listar usuarios", async () => {
await userRepository.crear(baseUser)
const users = await userRepository.listar()
expect(users.length).toBe(1)
})

test("buscar por ID", async () => {
const created = await userRepository.crear(baseUser)
const found = await userRepository.buscarPorId(created._id)
expect(found.email).toBe("juan@test.com")
})

test("buscar por email", async () => {
await userRepository.crear(baseUser)
const found = await userRepository.buscarPoremail("juan@test.com")
expect(found.username).toBe("juanp")
})

test("actualizar usuario", async () => {
const created = await userRepository.crear(baseUser)
const updated = await userRepository.actualizar(created._id, { username: "nuevo" })
expect(updated.username).toBe("nuevo")
})

test("eliminar usuario", async () => {
const created = await userRepository.crear(baseUser)
await userRepository.eliminar(created._id)
const found = await userRepository.buscarPorId(created._id)
expect(found).toBeNull()
})
})