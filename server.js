const express = require('express');
const os = require('os');
const cluster = require('cluster');
const cpuNums = os.cpus().length;

// console.log(cpuNums)

if (cluster.isPrimary) {
    for (let i = 0; i < cpuNums; i++) {
        cluster.fork();
    }
    cluster.on('exit', () => {
        cluster.fork();
    })
} else {
    const PORT = process.env.PORT || 5500;
    const app = express();
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
}