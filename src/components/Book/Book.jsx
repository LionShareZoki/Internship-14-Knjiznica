/* eslint-disable react/prop-types */
import "./Book.css";

export const Book = ({
  id,
  header,
  imageUrl,
  publisher,
  year,
  genre,
  availableItems,
  author,
  onBorrow,
  onReturn,
}) => {
  return (
    <div
      className={`book-wrapper ${availableItems === 0 ? "unavailable" : ""}`}
    >
      <div className="image-wrapper">
        <img
          src={
            imageUrl === ""
              ? "https://i0.wp.com/kamenjar.com/wp-content/uploads/2015/02/misal3.jpg?fit=890%2C578&ssl=1"
              : imageUrl
          }
          alt={header}
        />
      </div>
      <div className="book-header">{header}</div>
      <div className="book-id">Id: {id}</div>
      <div className="book-author">Autor: {author}</div>
      <div className="publisher">Izdavačka kuća: {publisher}</div>
      <div className="year">Godina izdavanja: {year}</div>
      <div className="genre">Žanr: {genre}</div>
      <div className="available-items">Dostupnost: {availableItems}</div>
      <div className="buttons-wrapper">
        <button disabled={availableItems === 0} onClick={() => onBorrow(id)}>
          Posudi
        </button>
        <button onClick={() => onReturn(id)}>Vrati</button>
      </div>
    </div>
  );
};
