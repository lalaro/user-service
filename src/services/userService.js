const User = require("../models/User");

// Crear usuario
exports.createUser = async (data) => {
  return await User.create(data);
};

// Obtener todos los usuarios
exports.getUsers = async () => {
  return await User.find();
};

// Obtener usuario por ID
exports.getUserById = async (id) => {
  return await User.findById(id);
};

// Actualizar usuario
exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar usuario
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
