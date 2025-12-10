const authMiddleware = require("../../src/middleware/authMiddleware")
const jwt = require("jsonwebtoken")

jest.mock("jsonwebtoken")

function mockRes() {
return {
status: jest.fn().mockReturnThis(),
json: jest.fn().mockReturnThis()
}
}

describe("authMiddleware", () => {
test("permite el paso cuando el token es válido", () => {
const req = {
header: () => "Bearer token123"
}
const res = mockRes()
const next = jest.fn()

jwt.verify.mockReturnValue({ id: "1", role: "user" })

authMiddleware(req, res, next)

expect(next).toHaveBeenCalled()
expect(req.user).toEqual({ id: "1", role: "user" })
})

test("retorna 401 si no se envía token", () => {
const req = {
header: () => null
}
const res = mockRes()
const next = jest.fn()

authMiddleware(req, res, next)

expect(res.status).toHaveBeenCalledWith(401)
expect(res.json).toHaveBeenCalledWith({ error: "Token requerido" })
expect(next).not.toHaveBeenCalled()
})

test("retorna 400 si el token es inválido", () => {
const req = {
header: () => "Bearer tokenMalo"
}
const res = mockRes()
const next = jest.fn()

jwt.verify.mockImplementation(() => {
  throw new Error("invalid token")
})

authMiddleware(req, res, next)

expect(res.status).toHaveBeenCalledWith(400)
expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" })
expect(next).not.toHaveBeenCalled()
})
})