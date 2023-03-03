import bcrypt from "bcrypt";
import { db } from "../database/database.js";

export async function signUpUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const userExists = await db.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (userExists.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHashed = bcrypt.hashSync(password, 10);

    await db.query(
      `
    INSERT INTO users (name, email password)
    VALUES ($1,$2,$3
    `,
      [name, email, passwordHashed]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}