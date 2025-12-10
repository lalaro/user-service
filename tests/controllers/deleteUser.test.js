const userController = require("../../src/controller/userController")
const userService = require("../../src/services/userService")

jest.mock("../../src/services/userService")

function mockRes() {
return {
status: jest.fn().mockReturnThis(),
json: jest.fn().mockReturnThis()
}
}

describe("userController.deleteUser", () => {
test("debe eliminar un usuario si existe", async () => {
const req = { params: { id: "123" } }
const res = mockRes()

userService.deleteUser.mockResolvedValue(true)

await userController.deleteUser(req, res)

expect(res.json).toHaveBeenCalledWith({
  message: "Usuario eliminado correctamente"
})
})

test("debe responder 404 si el usuario no existe", async () => {
const req = { params: { id: "123" } }
const res = mockRes()

userService.deleteUser.mockResolvedValue(null)

await userController.deleteUser(req, res)

expect(res.status).toHaveBeenCalledWith(404)
expect(res.json).toHaveBeenCalledWith({ error: "Usuario no encontrado" })
})
})