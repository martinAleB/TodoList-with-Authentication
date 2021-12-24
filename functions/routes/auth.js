const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { getToken } = require("../utils/tokens");

const router = express.Router();
const SALT_NUMBER = process.env.SALT_NUMBER;

const findUserByUsername = async (username) => {
  try {
    const findUserWithUsername = await User.findOne({ username: username });
    return findUserWithUsername;
  } catch (err) {
    console.log(err);
  }
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

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    // Chequeo que se hayan recibido todos los datos necesarios
    return res.status(400).json({ status: "Error" }); // Devuelvo un error en caso de que no sea asi
  }
  const loginUser = await findUserByUsername(username);
  if (loginUser === null) {
    return res.status(403).json({ status: "Username or password incorrect" });
  }
  const validPassword = await bcrypt.compare(password, loginUser.password);
  if (!validPassword) {
    return res.status(403).json({ status: "Username or password incorrect" });
  }
  const token = getToken(loginUser);
  res.status(200).send({ status: "OK", token });
});

module.exports = router;
