const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: {type: String,required: true,},
  correo: {type: String,required: true,unique: true,},
  contraseña: {type: String,required: true,},
  role: {type: String, default: "user",},
  profile: {type: String, default: null,},
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
