const authController = require("../../src/controller/authController")
const authService = require("../../src/services/authService")

jest.mock("../../src/services/authService")

function mockRes() {
return {
status: jest.fn().mockReturnThis(),
json: jest.fn().mockReturnThis()
}
}

describe("authController.login", () => {
test("login exitoso", async () => {
const req = {
body: { email: "test@test.com", password: "1234" }
}
const res = mockRes()

authService.login.mockResolvedValue({
  token: "abc123",
  user: {
    _id: "1",
    email: "test@test.com",
    username: "juan",
    role: "user"
  }
})

await authController.login(req, res)

expect(res.json).toHaveBeenCalledWith({
  message: "Login exitoso",
  token: "abc123",
  user: {
    id: "1",
    email: "test@test.com",
    username: "juan",
    role: "user"
  }
})
})

test("login falla", async () => {
const req = { body: { email: "bad@test.com", password: "wrong" } }
const res = mockRes()

authService.login.mockRejectedValue(new Error("Credenciales invalidas"))

await authController.login(req, res)

expect(res.status).toHaveBeenCalledWith(400)
expect(res.json).toHaveBeenCalledWith({ error: "Credenciales invalidas" })
})
})