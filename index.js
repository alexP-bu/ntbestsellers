/*
 * This file contains the index file for the server to run.
 * The server is designed to:
 *  - call the NYTimes API, collect books from URLS
 *  - map response into Books objects
 *  - render the list via pug render engine
*/

const express = require('express');
const path = require('path');
const axios = require('axios');
const API = require('./config/API');
const Book = require('./config/Book');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  //load URLS from API config
    const urls = [
      API.URL_HARDCOVER_FICTION, 
      API.URL_HARDCOVER_NONFICTION,
      API.URL_PPTF,
      API.URL_PNF,
      API.URL_MGH,
      API.URL_GBM
      ];
  //get all of the lists via the URLs
    const [fic, non, pptf, pnf, mgh, gbm] = await Promise.all(urls.map(getBooks));
    res.render('layout', {results: {
      fic: fic, 
      non: non, 
      pptf: pptf, 
      pnf: pnf, 
      mgh: mgh,
      gbm: gbm}});
});

const getBooks = async url  => {
    try {
      const res = await axios.get(url + "?api-key=" + API.Key);
      //book object requirements:
      // -ISBN
      // -TITLE
      // -AUTHOR
      // -Bookshop link
      return res.data.results.books.map(book => new Book(              
        book.primary_isbn13,
        book.title,
        book.author,
        'https://www.bookshop.org/a/15886/' + book.primary_isbn13
      ));
    } catch {
      console.log(err => console.log(err));
    }
};

app.listen(8080);