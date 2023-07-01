const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { registrar_usuario, obtener_usuario } = require("./qwerys");

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("SERVER ON", PORT));
app.use(cors());
app.use(express.json());

//MD
const valida_credenciales = (req, res, next) => {
  const { email, password, rol, lenguage } = req.body;
  if (!email || !password || !rol || !lenguage) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  next();
};
const valida_credencialesIni = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  next();
};
const token_valido = (req, res, next) => {
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "No hay token!" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.email = decoded;
    next();
  });
};
const qweryVal = (req, res, next) => {
  console.log("qwery valida:", req.method, req.url);
  next();
};
//EP

app.post("/usuarios", valida_credenciales, async (req, res) => {
  try {
    const usuario = req.body;
    await registrar_usuario(usuario);
    res.send("User registrado OK");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", valida_credencialesIni, async (req, res) => {
  const { email, password } = req.body;
  const usuario = await obtener_usuario(email);
  if (!usuario) {
    return res.status(401).json({ message: "Password invalida" });
  }
  const pass_valida = await bcrypt.compare(password, usuario.password);
  if (!pass_valida) {
    return res.status(401).json({ message: "Password invalida" });
  }
  const token = jwt.sign({ email: usuario.email }, process.env.SECRET_KEY);
  res.send(token);
});

app.get("/usuarios", token_valido, async (req, res) => {
  const { email } = req.email;
  const usuario = await obtener_usuario(email);
  if (!usuario) {
    return res.status(404).json({ message: "Usuario no valido" });
  }
  const noPassUser = { email: usuario.email, rol: usuario.rol, lenguage: usuario.lenguage }
  res.json(noPassUser);
});

app.use(qweryVal);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Problemas en el Server" });
});