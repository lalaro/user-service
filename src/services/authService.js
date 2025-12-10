const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const JWT_SECRET = process.env.JWT_SECRET;

// ====================
//   LOGIN
// ====================
exports.login = async (email, password) => {
  const user = await userRepository.buscarPoremail(email);

  if (!user) {
    throw new Error("El email no está registrado");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("password incorrecta");
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
exports.register = async (data) => {

  // Validar email único
  const userExist = await userRepository.buscarPoremail(data.email);
  if (userExist) throw new Error("El email ya está registrado");

  // Encriptar password
  const hash = await bcrypt.hash(data.password, 10);

  // Reemplazar password por hash
  data.password = hash;

  // Crear usuario
  const newUser = await userRepository.crear(data);

  return newUser;
};
