// src/App.js

import React, { Component } from 'react';
import axios from 'axios';
import BookList from './components/BookList';

class App extends Component {
  state = {
    books: [],
    searchTerm: '', // Добавляем состояние для хранения строки поиска
    category: 'all', // Добавляем состояние для хранения выбранной категории
    sorting: 'relevance', // Добавляем состояние для хранения выбранной сортировки
  };

  componentDidMount() {
    this.searchBooks('javascript', 'all', 'relevance'); // По умолчанию ищем книги по JavaScript, во всех категориях и с сортировкой по релевантности
  }

  // Функция для выполнения поиска книг
  searchBooks = (query, category, sorting) => {
    // Замените 'YOUR_API_KEY' на свой ключ Google Books API
    const API_KEY = 'AIzaSyCZrAfF76s4Mituqi_oueL30mEUW41mSl4';
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&subject:${category}&orderBy=${sorting}`;

    axios.get(apiUrl)
      .then((response) => {
        const books = response.data.items;
        this.setState({ books });
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }

  // Обработчик изменения поля ввода
  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  // Обработчик изменения выбранной категории
  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  }

  // Обработчик изменения выбранной сортировки
  handleSortingChange = (event) => {
    this.setState({ sorting: event.target.value });
  }

  // Обработчик отправки формы поиска
  handleSubmit = (event) => {
    event.preventDefault();
    this.searchBooks(this.state.searchTerm, this.state.category, this.state.sorting);
  }

  render() {
    const { books, searchTerm, category, sorting } = this.state;

    return (
      <div className="App">
        <h1>Приложение для книг</h1>
        <form onSubmit={this.handleSubmit}>
          <select value={category} onChange={this.handleCategoryChange}>
            <option value="all">Все</option>
            <option value="art">Искусство</option>
            <option value="biography">Биографии</option>
            <option value="computers">Компьютеры</option>
            <option value="history">История</option>
            <option value="medical">Медицина</option>
            <option value="poetry">Поэзия</option>
          </select>
          <select value={sorting} onChange={this.handleSortingChange}>
            <option value="relevance">Релевантность</option>
            <option value="newest">Новые</option>
          </select>
          <input
            type="text"
            placeholder="Введите запрос"
            value={searchTerm}
            onChange={this.handleInputChange}
          />
          <button type="submit">Поиск</button>
        </form>
        <BookList books={books} />
      </div>
    );
  }
}

export default App;
