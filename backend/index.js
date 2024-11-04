const express = require('express');
const fs = require('node:fs/promises');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (req, res) => {
    console.log("Received request on /")

    try {
        // String -> JS Object -> JSON
        const response = await fs.readFile('./bg1.json', { encoding: 'utf8' })
        const jsonData = JSON.parse(response)
        res.send(jsonData)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to read file' })
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
