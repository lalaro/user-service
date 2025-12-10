const userService = require("../../src/services/userService")
const User = require("../../src/models/User")

jest.mock("../../src/models/User")

describe("userService", () => {

test("createUser crea un usuario", async () => {
User.create.mockResolvedValue({ email: "test@test.com" })

const result = await userService.createUser({ email: "test@test.com" })

expect(result.email).toBe("test@test.com")
expect(User.create).toHaveBeenCalled()
})

test("getUsers retorna usuarios", async () => {
User.find.mockResolvedValue([
{ email: "a@test.com" },
{ email: "b@test.com" }
])

const result = await userService.getUsers()

expect(result.length).toBe(2)
})

test("getUserById retorna un usuario", async () => {
User.findById.mockResolvedValue({ id: "123", email: "test@test.com" })

const result = await userService.getUserById("123")

expect(result.id).toBe("123")
})

test("updateUser actualiza un usuario", async () => {
User.findByIdAndUpdate.mockResolvedValue({
id: "123",
email: "nuevo@test.com"
})

const result = await userService.updateUser("123", {
  email: "nuevo@test.com"
})

expect(result.email).toBe("nuevo@test.com")
})

test("deleteUser elimina un usuario", async () => {
User.findByIdAndDelete.mockResolvedValue(true)

const result = await userService.deleteUser("123")

expect(result).toBe(true)
})

})