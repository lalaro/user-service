const authController = require("../../src/controller/authController")
const authService = require("../../src/services/authService")

jest.mock("../../src/services/authService")

function mockRes() {
return {
status: jest.fn().mockReturnThis(),
json: jest.fn().mockReturnThis()
}
}

describe("authController.register", () => {
test("registro exitoso", async () => {
const req = {
body: {
email: "nuevo@test.com",
password: "1234"
}
}
const res = mockRes()

authService.register.mockResolvedValue({
  id: "1",
  email: "nuevo@test.com"
})

await authController.register(req, res)

expect(res.json).toHaveBeenCalledWith({
  message: "Usuario registrado exitosamente",
  user: {
    id: "1",
    email: "nuevo@test.com"
  }
})
})

test("registro falla", async () => {
const req = {
body: {
email: "nuevo@test.com",
password: "1234"
}
}
const res = mockRes()

authService.register.mockRejectedValue(new Error("El email ya está registrado"))

await authController.register(req, res)

expect(res.status).toHaveBeenCalledWith(400)
expect(res.json).toHaveBeenCalledWith({ error: "El email ya está registrado" })
})
})