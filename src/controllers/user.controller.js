import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.js";
import { shortenUrl } from "./url.controller.js";

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
    return;
  }
}

export async function getUserProfilebyId(req, res) {
  const session = res.locals.session; 
  try {
    const viewCounter = await db.query(
      `
    SELECT SUM("viewCount")
    FROM urls 
    WHERE urls."userId"=$1;`,
      [session.rows[0].userId]
    );

    const urlsfromUserLoggedIn = await db.query(
      `
    SELECT id, "shortUrl", url, "viewCount" as "visitCount"
    FROM urls 
    WHERE urls."userId"=$1;`,
      [session.rows[0].userId]
    );
    const username = await db.query(
      `
    SELECT id, name 
    FROM users 
    WHERE users.id=$1;`,
      [session.rows[0].userId]
    );

    res.send({
      id: username.rows[0].id,
      name: username.rows[0].name,
      visitCount: viewCounter.rows[0] || 0 ,
      shortenedUrls: urlsfromUserLoggedIn.rows,
    })
  } catch (err) {
    res.status(500).send(err.message);
  }
}