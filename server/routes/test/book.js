let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../app');
let should = chai.should();


chai.use(chaiHttp);
describe('Books', () => {

  //Test the /GET route

  //Test to ping the server to check 200 status
  describe('/GET check If goodreads returns response', () => {
    it('it should GET all the books', (done) => {
      chai.request(app)
        .get('/api/v1/book')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  //Test case for invalid input with some garbage value name and getting response as 0 books found and no error
  describe('/GET books from goodreads for invalid book name', () => {
    it('it should return no books with 0 array length', (done) => {
      chai.request(app)
        .get(`/api/v1/book?title='skdkdsnkdsnvkldsnvkdsjnfsdjflksdj'`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.books.should.be.a('array');
          res.body.books.length.should.be.eql(0);
          done();
        });
    });
  });

  //Test case for valid input with some real book name and getting response as 20 books
  describe('/GET books from goodreads for valid book name', () => {
    it('it should return list of books with 20 array length', (done) => {
      chai.request(app)
        .get(`/api/v1/book?title='Matchmaker'`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.books.should.be.a('array');
          res.body.books.length.should.be.eql(20);
          done();
        });
    });
  });


  //Test if response from goodreads which is in XML is parsed properly to JSON and returned
  describe('/GET JSON response for books in form of array', () => {
    it('it should GET books in array format', (done) => {
      chai.request(app)
        .get('/api/v1/book')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.books.should.be.a('array');
          done();
        });
    });
  });


  //Test the /GET:id route

  //Test to ping the server to check 200 status
  describe('/GET:id check If goodreads returns response', () => {
    it('it should GET all the books', (done) => {
      chai.request(app)
        .get('/api/v1/book/12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  //Test if response from goodreads which is in XML is parsed properly to JSON and returned
  describe('/GET:id JSON response for books in form of object', () => {
    it('it should GET books in object format', (done) => {
      chai.request(app)
        .get('/api/v1/book/12345')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.books.should.be.a('object');
          done();
        });
    });
  });

});