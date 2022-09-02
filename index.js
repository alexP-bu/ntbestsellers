const express = require('express');
const path = require('path');
const axios = require('axios');
const API = require('./config/API');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    const fic = [];
    const non = [];
    await getBooks(fic, API.URL_HARDCOVER_FICTION);
    await getBooks(non, API.URL_HARDCOVER_NONFICTION);
    res.render('layout', {results: {fic: fic, non: non}});
});

const getBooks = async (array, url)  => {
    await axios.get(url + "?api-key=" + API.Key)
        .then( async res => {
          const list = await res.data.results.books;
          list.forEach( book => {
            array.push('https://www.bookshop.org/a/15886/' + book.primary_isbn13);
          })
        })
        .catch(error => {
          console.error(error);
        });
    return array;
}

app.listen(8080);