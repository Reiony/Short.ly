import { nanoid } from "nanoid";
import {db} from "../database/database.js"
export async function shortenUrl(req, res) {
  const { url } = req.body;

  try {
    const session = res.locals.session;
    console.log(session);
    const shortUrl = nanoid(8);

    await db.query(
      `INSERT INTO urls (url, "shortUrl", "userId") 
      VALUES ($1,$2,$3);`,
      [url, shortUrl, session.rows[0].userId]
    );

    const shortUrlwithId = await connection.query(
      `SELECT id, "shortUrl" FROM urls WHERE "shortUrl"=$1;`,
      [shortUrl]
    );

    res.status(201).send(shortUrlwithId.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
