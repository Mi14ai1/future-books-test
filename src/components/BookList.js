// src/components/BookList.js

import React, { Component } from 'react';

class BookList extends Component {
  render() {
    const { books } = this.props;
    const bookCount = books.length;

    return (
      <div>
        <h2>Список книг ({bookCount} найдено)</h2>
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <div>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || 'No Image'}
                  alt={book.volumeInfo.title}
                />
              </div>
              <div>
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Автор не указан'}</p>
                <p>{book.volumeInfo.description || 'Описание отсутствует'}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BookList;
