import { db } from "../database/database.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const checkSession = await db.query(
      `
        SELECT * FROM sessions WHERE token = $1`,
      [token]
    );
    if (checkSession.rowCount === 0) {
      res.sendStatus(401);
      return;
    }
    res.locals.session = checkSession;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}
