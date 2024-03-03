/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Form.css";
import { v4 as uuidv4 } from "uuid";

export const Form = ({ addBook }) => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [itemsNumber, setItemsNumber] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Ime knjige je obavezno.";
    if (!author.trim()) newErrors.author = "Autor je obavezan.";
    if (!publisher.trim()) newErrors.publisher = "Izdavačka kuća je obavezna.";
    if (
      !year.trim() ||
      isNaN(year) ||
      parseInt(year, 10) < 1000 ||
      parseInt(year, 10) > new Date().getFullYear()
    )
      newErrors.year = "Godina izdavanja je nevažeća.";
    if (!genre.trim()) newErrors.genre = "Žanr je obavezan.";
    if (
      !itemsNumber.trim() ||
      isNaN(itemsNumber) ||
      parseInt(itemsNumber, 10) < 1
    )
      newErrors.itemsNumber = "Broj dostupnih primjeraka je nevažeći.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newBook = {
      id: uuidv4(),
      title: name,
      author,
      publishYear: parseInt(year, 10),
      genre,
      img: image,
      publisher,
      availableItems: parseInt(itemsNumber, 10),
    };

    addBook(newBook);
    setName("");
    setAuthor("");
    setPublisher("");
    setYear("");
    setGenre("");
    setItemsNumber("");
    setImage("");
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="header">Želite dodati novu knjigu?</div>
      <div className="inputs-wrapper">
        <div>
          <label>Ime</label>
          {errors.name && <div className="error-message">{errors.name}</div>}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ime"
          />
        </div>
        <div>
          <label>Autor</label>
          {errors.author && (
            <div className="error-message">{errors.author}</div>
          )}
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor"
          />
        </div>
        <div>
          <label>Izdavačka kuća</label>
          {errors.publisher && (
            <div className="error-message">{errors.publisher}</div>
          )}
          <input
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="Izdavačka kuća"
          />
        </div>
        <div>
          <label>Godina izdavanja</label>
          {errors.year && <div className="error-message">{errors.year}</div>}
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Godina izdavanja"
            type="number"
          />
        </div>
        <div>
          <label>Žanr</label>
          {errors.genre && <div className="error-message">{errors.genre}</div>}
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Žanr"
          />
        </div>
        <div>
          <label>Dostupnost</label>
          {errors.itemsNumber && (
            <div className="error-message">{errors.itemsNumber}</div>
          )}

          <input
            value={itemsNumber}
            onChange={(e) => setItemsNumber(e.target.value)}
            placeholder="Dostupnost"
            type="number"
          />
        </div>
        <div>
          <label>Slika</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Slika"
          />
        </div>
        <button type="submit">Dodaj knjigu</button>
      </div>
    </form>
  );
};
