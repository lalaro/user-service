const User = require("../models/User");

// Crear usuario
exports.crear = async (data) => {
  return await User.create(data);
};

// Listar todos los usuarios
exports.listar = async () => {
  return await User.find();
};

// Buscar usuario por ID
exports.buscarPorId = async (id) => {
  return await User.findById(id);
};

// Buscar usuario por correo (importante para login y registro)
exports.buscarPorCorreo = async (correo) => {
  return await User.findOne({ correo });
};

// Actualizar usuario
exports.actualizar = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar usuario
exports.eliminar = async (id) => {
  return await User.findByIdAndDelete(id);
};
