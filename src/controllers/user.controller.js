import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
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
    INSERT INTO users (name, email, password)
    VALUES ($1,$2,$3)
    `,
      [name, email, passwordHashed]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signInUser(req, res) {
  const { email, password } = req.body;
  try {
    const userExists = await db.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (userExists.rowCount === 0) {
      return res.sendStatus(401);
    } else if (!bcrypt.compareSync(password, userExists.rows[0].password)) {
      return res.sendStatus(401);
    }

    const token = uuid();
    await db.query(
      `
      INSERT INTO sessions (token, "userId", "createdAt")
      VALUES ($1,$2,NOW())`,
      [token, userExists.rows[0].id]
    );
    res.status(200).send({ token });

  } catch (err) {
    res.status(500).send(err.message);
  }

  res.sendStatus(200);
}
