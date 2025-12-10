const userController = require("../../src/controller/userController")
const userService = require("../../src/services/userService")

jest.mock("../../src/services/userService")

function mockRes() {
return {
status: jest.fn().mockReturnThis(),
json: jest.fn().mockReturnThis()
}
}

describe("userController.getUserById", () => {
test("debe devolver un usuario si existe", async () => {
const req = { params: { id: "123" } }
const res = mockRes()

userService.getUserById.mockResolvedValue({ id: "123", username: "Juan" })

await userController.getUserById(req, res)

expect(res.json).toHaveBeenCalledWith({ id: "123", username: "Juan" })
})

test("debe responder 404 si el usuario no existe", async () => {
const req = { params: { id: "123" } }
const res = mockRes()

userService.getUserById.mockResolvedValue(null)

await userController.getUserById(req, res)

expect(res.status).toHaveBeenCalledWith(404)
expect(res.json).toHaveBeenCalledWith({ error: "Usuario no encontrado" })
})
})