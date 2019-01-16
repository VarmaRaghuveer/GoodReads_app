const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const book = require('./server/routes/api/v1/book');

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api/v1/book', book);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT} port`));

