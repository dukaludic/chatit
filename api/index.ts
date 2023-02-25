import express from 'express';
const PORT = 8080;
const app = express();

app.get('/', (req, res) => {
    res.send('Hi');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${8080}`)
})