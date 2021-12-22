const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { getToken } = require("../utils/tokens");

const router = express.Router();
const SALT_NUMBER = 10;

const findUserByUsername = async (username) => {
  const findUserWithUsername = await User.findOne({ username: username });
  return findUserWithUsername;
};

// Register an user
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  if (
    !username ||
    username.trim().length === 0 ||
    !password ||
    password.trim().length === 0
  ) {
    // Chequeo que se hayan recibido todos los datos necesarios
    return res.status(400).json({ status: "Error" }); // Devuelvo un error en caso de que no sea asi
  }
  const userWithUsername = await findUserByUsername(username);
  if (userWithUsername !== null) {
    return res.status(403).json({ status: "Username unavailable" }); // Ese nombre de usuario no está disponible
  }
  const user = new User(req.body); // Creo el usuario con los datos
  const hashing = await bcrypt.genSalt(SALT_NUMBER); // Genero un hasheo
  user.password = await bcrypt.hash(user.password, hashing); // Hasheo la password
  await user.save(); // Guardo el usuario en la base de datos
  const token = getToken(user);
  res.status(200).json({ status: "OK", token });
});

// Iniciar sesion
router.post("/login", async (req, res, next) => {
  console.log("Entro al login");
  const { username, password } = req.body;
  if (!username || !password) {
    // Chequeo que se hayan recibido todos los datos necesarios
    return res.status(400).json({ status: "Error" }); // Devuelvo un error en caso de que no sea asi
  }
  const loginUser = await findUserByUsername(username);
  console.log("Ya findee el username");
  if (loginUser === null) {
    return res.status(403).json({ status: "Username or password incorrect" });
  }
  console.log("Ya valide si existe el usuario");
  const validPassword = await bcrypt.compare(password, loginUser.password);
  if (!validPassword) {
    return res.status(403).json({ status: "Username or password incorrect" });
  }
  console.log("Ya valide si la contraseña es correcta");
  const token = getToken(loginUser);
  console.log("Ya obtuve el token. Voy a retornarlo :D");
  res.status(200).json({ status: "OK", token });
});

module.exports = router;
