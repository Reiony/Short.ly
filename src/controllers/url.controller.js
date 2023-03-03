import { nanoid } from "nanoid";
import { db } from "../database/database.js";
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

export async function getUrlDetails(req, res) {
  try {
    const { id } = req.params;
    const Url = await db.query(
      `
        SELECT id, "shortUrl", url 
        FROM urls WHERE id=$1`,
      [id]
    );
    if (Url.rowCount === 0) {
      res.sendStatus(404);
    }
    res.status(200).send(Url.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
    return;
  }
}

export async function getShortenedUrl(req, res) {
  const { shortenedUrl } = req.params;

  try {
    const shUrl = await db.query(
      `
    SELECT * 
    FROM urls 
    WHERE "shortUrl"=$1`,
      [shortenedUrl]
    );
    if (shUrl.rowCount===0){
        return res.sendStatus(404);
    }
    await db.query(`UPDATE urls SET viewCount = viewCount + 1 WHERE id=$1`,[shUrl.rows[0].id])
    res.redirect(shUrl.rows[0].url);
  } catch (err) {
    res.status(500).send(err.message);
    return;
  }
}
