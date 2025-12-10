const authService = require("../../src/services/authService")
const userRepository = require("../../src/repository/userRepository")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

jest.mock("../../src/repository/userRepository")
jest.mock("bcrypt")
jest.mock("jsonwebtoken")

describe("authService", () => {

test("login exitoso", async () => {
const mockUser = {
_id: "1",
email: "test@test.com",
password: "hashedpass",
role: "user"
}

userRepository.buscarPoremail.mockResolvedValue(mockUser)
bcrypt.compare.mockResolvedValue(true)
jwt.sign.mockReturnValue("TOKEN123")

const result = await authService.login("test@test.com", "12345")

expect(result.token).toBe("TOKEN123")
expect(result.user.email).toBe("test@test.com")
})

test("login falla si el usuario no existe", async () => {
userRepository.buscarPoremail.mockResolvedValue(null)

await expect(authService.login("no@test.com", "123"))
  .rejects
  .toThrow("El email no está registrado")
})

test("login falla si el password es incorrecto", async () => {
userRepository.buscarPoremail.mockResolvedValue({
email: "test@test.com",
password: "hashed"
})

bcrypt.compare.mockResolvedValue(false)

await expect(authService.login("test@test.com", "wrong"))
  .rejects
  .toThrow("password incorrecta")
})

test("register exitoso", async () => {
userRepository.buscarPoremail.mockResolvedValue(null)
bcrypt.hash.mockResolvedValue("HASHED")
userRepository.crear.mockResolvedValue({
email: "new@test.com",
password: "HASHED"
})

const result = await authService.register({
  email: "new@test.com",
  password: "1234"
})

expect(result.email).toBe("new@test.com")
})

test("register falla si el email ya existe", async () => {
userRepository.buscarPoremail.mockResolvedValue({ email: "used@test.com" })

await expect(
  authService.register({ email: "used@test.com", password: "123" })
).rejects.toThrow("El email ya está registrado")
})

})