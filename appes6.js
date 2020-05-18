class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI {
    //Adding a book
    addBookToList(book) {
        //Get the table head
        const list = document.getElementById('book-list');
        //ADD tr element
        const row = document.createElement('tr');
        //Insert Columns
        row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class = "delete">X</a></td>
    `;

        list.appendChild(row);

    }

    //Show alert
    showAlert(message, className) {
        //Create div
        const div = document.createElement('div');
        //Add class Name
        div.className = `alert ${className}`;
        //Add text to the div
        div.appendChild(document.createTextNode(message));
        //Get parent
        const container = document.querySelector('.container');
        //Get the next so we can insert before it
        const form = document.querySelector('#book-form');
        //Insert alert
        container.insertBefore(div, form);

        //Timeout after
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    //Delete a book
    deleteBook(target) {
        if (target.className === 'delete') {
            //target = X , parent = td, grandparent = tr
            //tr will be deleted
            target.parentElement.parentElement.remove();
        }

    }

    //Clear fields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }

}

//Local Storage class
class Store {
    //Fetching from local storage
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    //Display books
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI;
            //Add book to UI
            ui.addBookToList(book);
        });
    }

    //Add Book
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    //Remove book
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM LOAD EVENT (this will display book on browser refresh)
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//EVENT LISTENER FOR ADDING BOOK
document.getElementById('book-form').addEventListener('submit', function (e) {
    //Getting inputs from the form
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //Creating a book
    const book = new Book(title, author, isbn);

    //Instanitate UI
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        //alert error
        ui.showAlert('Please fill in the details', 'error');
    } else {
        //ADD BOOK TO LIST
        ui.addBookToList(book);

        //ADD TO LOCAL STORAGE
        Store.addBook(book);

        //ALERT AFTER ADDING A BOOK
        ui.showAlert('Book has been added', 'success');

        //Clear fields after submit
        ui.clearFields();
    }


    e.preventDefault();
});

//EVENT LISTENER FOR DELETE
document.getElementById('book-list').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteBook(e.target);

    //Remove book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show delete alert
    ui.showAlert('Book removed!!!', 'success');

    e.preventDefault();
});
