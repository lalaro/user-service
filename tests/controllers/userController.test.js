const userController = require("../../src/controller/userController")
const userService = require("../../src/services/userService")

jest.mock("../../src/services/userService")

function mockRes() {
return {
status: jest.fn().mockReturnThis(),
json: jest.fn().mockReturnThis()
}
}

describe("userController.getUsers", () => {
test("debe devolver lista de usuarios", async () => {
const req = {}
const res = mockRes()

userService.getUsers.mockResolvedValue([
  { username: "juan" },
  { username: "maria" }
])

await userController.getUsers(req, res)

expect(res.json).toHaveBeenCalledWith([
  { username: "juan" },
  { username: "maria" }
])
})
})