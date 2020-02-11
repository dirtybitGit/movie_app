import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({ id, year, title, summary, poster, genres, imdb }) {
  return (
    <div className="movie">
      <a
        href={`https://www.imdb.com/title/${imdb}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={poster} alt={title} title={title} />
      </a>
      <div className="movie__data">
        <a
          href={`https://www.imdb.com/title/${imdb}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="movie__title">{title}</h3>
        </a>
        <h5 className="movie__year">{year}</h5>
        <ul className="movie__genres">
          {genres.map((genre, index) => (
            <li key={index} className="genres__genre">
              {genre}
            </li>
          ))}
        </ul>
        <p className="movie__summary">{summary.slice(0, 180)}...</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;