const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;

app.get("/", async (req, res) => {
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
        result += 1;
    }
    return res.json({ processId: process.pid, result })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT} and pid ${process.pid}`)
})