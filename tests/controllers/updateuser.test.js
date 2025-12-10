const userController = require("../../src/controller/userController")
const userService = require("../../src/services/userService")

jest.mock("../../src/services/userService")

function mockRes() {
return {
status: jest.fn().mockReturnThis(),
json: jest.fn().mockReturnThis()
}
}

describe("userController.updateUser", () => {
test("debe actualizar un usuario si existe", async () => {
const req = {
params: { id: "123" },
body: { username: "nuevo" }
}
const res = mockRes()

userService.updateUser.mockResolvedValue({
  id: "123",
  username: "nuevo"
})

await userController.updateUser(req, res)

expect(res.json).toHaveBeenCalledWith({
  id: "123",
  username: "nuevo"
})
})

test("debe responder 404 si el usuario no existe", async () => {
const req = {
params: { id: "123" },
body: { username: "nuevo" }
}
const res = mockRes()

userService.updateUser.mockResolvedValue(null)

await userController.updateUser(req, res)

expect(res.status).toHaveBeenCalledWith(404)
expect(res.json).toHaveBeenCalledWith({ error: "Usuario no encontrado" })
})
})