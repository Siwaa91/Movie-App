import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./Search.svg";
const API_URL = "http://www.omdbapi.com?apikey=eb05958a";

const App = () => {
  const [movie, setMovies] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("");
  }, []);
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(SearchTerm)}
        />
      </div>

      {movie?.length > 0 ? (
        <div className="container">
          {movie.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
