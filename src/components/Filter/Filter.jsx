/* eslint-disable react/prop-types */
import { initialBooks } from "../../assets/books";
import { useState } from "react";
import { useEffect } from "react";
import "./Filter.css";

export const Filter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Svi");
  const [genres, setGenres] = useState(["Svi"]);

  useEffect(() => {
    const uniqueGenres = new Set(initialBooks.map((book) => book.genre));
    setGenres(["Svi", ...uniqueGenres]);
  }, []);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onFilter(newSearchTerm, selectedGenre);
  };

  const handleGenreChange = (event) => {
    const newGenre = event.target.value;
    setSelectedGenre(newGenre);
    onFilter(searchTerm, newGenre);
  };

  return (
    <div className="filter-container">
      <h1>Fitriraj po naslovu, autoru ili žanru</h1>
      <input
        type="text"
        placeholder="Pretraži po naslovu ili autoru..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <p>Odaberi žanr</p>
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        placeholder="Odaberi žanr"
      >
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};
