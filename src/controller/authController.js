const authService = require("../services/authService");

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const { token, user } = await authService.login(correo, contraseña);

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        correo: user.correo,
        nombre: user.nombre,
        role: user.role
      }
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, role } = req.body;

    // AHORA EN EL ORDEN CORRECTO
    const newUser = await authService.register(correo, contraseña, nombre, role);

    res.json({
      message: "Usuario registrado exitosamente",
      user: {
        correo: newUser.correo,
        nombre: newUser.nombre,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
