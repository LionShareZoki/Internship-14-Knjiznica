import { useState, useEffect } from "react";
import { Filter } from "../../components/Filter/Filter";
import { Form } from "../../components/Form/Form";
import { Book } from "../../components/Book/Book";
import { Header } from "../../components/Header/Header";
import { initialBooks } from "../../assets/books";
import "./HomePage.css";

export const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const sortBooks = (booksArray) => {
    return booksArray.sort((a, b) => {
      if (a.author < b.author) return -1;
      if (a.author > b.author) return 1;
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return a.publishYear - b.publishYear;
    });
  };

  useEffect(() => {
    const sortedBooks = sortBooks([...initialBooks]);
    setBooks(sortedBooks);
    setFilteredBooks(sortedBooks);
  }, []);

  const filterBooks = (searchTerm, genre) => {
    let tempBooks = [...books];

    if (genre !== "Svi") {
      tempBooks = tempBooks.filter((book) => book.genre === genre);
    }

    if (searchTerm) {
      tempBooks = tempBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(sortBooks(tempBooks));
  };

  const addBook = (newBook) => {
    const newBooksList = sortBooks([...books, newBook]);
    setBooks(newBooksList);
    filterBooks("", "Svi");
  };

  const borrowBook = (id) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id && book.availableItems > 0) {
        return { ...book, availableItems: book.availableItems - 1 };
      }
      return book;
    });
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const returnBook = (id) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, availableItems: book.availableItems + 1 };
      }
      return book;
    });
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  return (
    <div className="home-page-wrapper">
      <Header />
      <Filter onFilter={filterBooks} />
      <div className="book-shelf">
        {filteredBooks.map((book) => (
          <Book
            key={book.id}
            id={book.id}
            header={book.title}
            imageUrl={book.img}
            publisher={book.publisher}
            year={book.publishYear}
            genre={book.genre}
            author={book.author}
            availableItems={book.availableItems}
            onBorrow={borrowBook}
            onReturn={returnBook}
          />
        ))}
      </div>
      <Form addBook={addBook} />
    </div>
  );
};
