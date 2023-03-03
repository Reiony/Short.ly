export async function shortenUrl(req, res){
    const {url} = req.body;

    try {
        const session = res.locals.session;
        console.log(session);
        const shortUrl = nanoid(12);

        await connection.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1,$2,$3);`,
            [url, shortUrl,session.rows[0].userId]);

            const shortUrlId = await connection.query(`SELECT id, "shortUrl" FROM urls WHERE "shortUrl"=$1;`, [shortUrl])

        res.status(201).send(shortUrlId.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);

    }
}