const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true,
});
const registrar_usuario = async (usuario) => {
  const { email, password, rol, lenguage } = usuario;
  const pass_encrip = bcrypt.hashSync(password, 10);
  const qwery =
"INSERT INTO usuarios (email,password, rol, lenguage) values($1, $2, $3, $4) RETURNING *";
  const values = [email, pass_encrip, rol, lenguage];
  const result = await pool.query(qwery, values);
};
const obtener_usuario = async (email) => {
  const qwery = "SELECT * FROM usuarios WHERE email = $1";
  const value = [email]
  const { rows } = await pool.query(qwery, value);
  return rows[0];
};
module.exports = {
  registrar_usuario,
  obtener_usuario,
};