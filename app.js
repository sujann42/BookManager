//Book Constructor => Handle book creating and deletion

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor => Set of prototype methods to show alerts
function UI() {
}

//ADD BOOK TO LIST
UI.prototype.addBookToList = (book) => {
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

//SHOW ALERT
UI.prototype.showAlert = (message, className) => {
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

//DELETE BOOK
UI.prototype.deleteBook = (target) => {
    if (target.className === 'delete') {
        //target = X , parent = td, grandparent = tr
        //tr will be deleted
        target.parentElement.parentElement.remove();
    }
}

//Clear Fields
UI.prototype.clearFields = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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

    //Show delete alert
    ui.showAlert('Book removed!!!', 'success');

    e.preventDefault();
});
