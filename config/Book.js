/*
 * This class is desgined to import book objects with the data
 * we need from the API. 
 */
class Book {
    constructor(isbn, title, author, link){
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.link = link;
    }
}

module.exports = Book;