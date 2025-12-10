const authService = require("../services/authService");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.register = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);

    res.json({
      message: "Usuario registrado exitosamente",
      user: newUser
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


