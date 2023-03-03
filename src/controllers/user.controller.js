export async function signUpUser(req, res) {
  const { name, email, password } = req.body;
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
  res.sendStatus(201);
}
