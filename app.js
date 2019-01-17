const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const book = require('./server/routes/api/v1/book');

const PORT = process.env.PORT || 5000;

//Since React app is in same directory we are going to build react for production in heroku deployment
app.use(express.static(path.join(__dirname, 'client/build')));

//With express version 4+ no need to use body parser library
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//enabling cors
app.use(cors());

//Our API's
app.use('/api/v1/book', book);


//For any URL redirect application to react index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT} port`));

module.exports = app; // for testing

