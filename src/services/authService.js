const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const JWT_SECRET = process.env.JWT_SECRET;

// ====================
//   LOGIN
// ====================
exports.login = async (correo, contraseña) => {
  const user = await userRepository.buscarPorCorreo(correo);

  if (!user) {
    throw new Error("El correo no está registrado");
  }

  const match = await bcrypt.compare(contraseña, user.contraseña);

  if (!match) {
    throw new Error("Contraseña incorrecta");
  }

  // Crear token con ID del usuario
  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user };
};

// ====================
//   REGISTER
// ====================
exports.register = async (correo, contraseña, nombre, role = "user") => {
  const userExist = await userRepository.buscarPorCorreo(correo);

  if (userExist) {
    throw new Error("El correo ya está registrado");
  }

  const hash = await bcrypt.hash(contraseña, 10);

  const newUser = await userRepository.crear({
    nombre,
    correo,
    contraseña: hash,
    role,
  });

  return newUser;
};
