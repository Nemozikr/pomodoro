

const express = require('express');
const app = express();
const db = require('./database/db');

const PORT = process.env.PORT || 3000;

const memory = [];

app.use(express.json());

app.get('/sessions', (req, res) => {
    if (!memory) {
        res.status(404);
    } else {
        res.json(memory);
    }
});

app.post('/sessions', (req, res) => {
    const { timestamp, sessionLength } = req.body;

    const session = {
        id: (memory.length + 1),
        sessionLength,
        timestamp
    }
    memory.push(session);

    res.status(201).json(session);
});

app.delete('/sessions/:id', (req, res) => {
    const deleteID = req.params.id;

    for (let i = 0; i < memory.length; i++) {
        if (memory[i].id == deleteID) {
            memory.splice(i, 1);
            res.status(204);
        }
    }
});



app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
