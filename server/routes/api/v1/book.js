const express = require('express');
const request = require('request-promise');
const parseString = require('xml2js').parseString;
const config = require('../../../config/config');

const router = express.Router();

router
    .get('/:id', async (req, res) => {
        const bookIsbn = req.params.id;
        let data = []
        let error = null;
        try{
            const response =  await request(`${config.GOODREADS_URL}/book/isbn/${bookIsbn}?key=${config.KEY}`);
            parseString(response, (err, result) => {
                const book = result['GoodreadsResponse']['book'][0];
                const id = book.id[0],
                title = book.title[0],
                imageUrl = book.image_url[0],
                publicationDate = `${book.publication_year[0]}-${book.publication_month[0]}-${book.publication_day[0]}`,
                publisher = book.publisher[0],
                description = book.description[0],
                averageRating = book.average_rating[0],
                numPages = book.num_pages[0],
                authors = book.authors[0].author[0].name[0];
                res.json({'books': {
                    id, title, imageUrl, publicationDate, publisher, description, averageRating, numPages, authors
                }, 'error': error});                
            });
        } catch(err){
            error = err.message;
            res.json({'books': data, 'error': error});
        }
    })
    .get('/', async (req, res) => {
        let data = []
        let error = null;
        try{
            const bookTitle = req.query.title;
            const response =  await request(`${config.GOODREADS_URL}/search.xml?key=${config.KEY}&q=${bookTitle}`);
            parseString(response, (err, result) => {
                const books = result['GoodreadsResponse']['search'][0]['results'][0]['work'];
                const bestBooks = books.map(book => book.best_book );
                data = bestBooks.map(bestBook => {
                                const id = bestBook[0]['id'][0]['_'];
                                const title = bestBook[0]['title'][0];
                                const imageUrl = bestBook[0]['small_image_url'];
                                return {
                                    id, title, imageUrl
                                }
                            });
                res.json({'books': data, 'error': error});
            });
        } catch(err){
            error = err.message;
            res.json({'books': data, 'error': error});
        }
    });

module.exports = router;