import React from "react";
import "./App.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Movie from "./Movie";

class App extends React.Component {
  state = {
    isLoading: true,
    nowPage: 1,
    dataCnt: 20,
    limit: 20,
    hasMore: true,
    movies: []
  };

  getMovies = async () => {
    console.log("getMovies Start");
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      `https://yts-proxy.now.sh/list_movies.json?sort_by=rating&page=${this.state.nowPage}`
    );
    // this.setState({ movies, isLoading: false });
    this.setState({
      movies: [...this.state.movies, ...movies],
      nowPage: this.state.nowPage + 1,
      isLoading: false,
      dataCnt: this.state.limit * this.state.nowPage
    });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies, dataCnt, hasMore } = this.state;
    console.log(hasMore);
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <InfiniteScroll
            className="movies"
            dataLength={dataCnt}
            next={this.getMovies}
            hasMore={hasMore}
            loader={
              <div className="loader">
                <span className="loader__text">Loading...</span>
              </div>
            }
          >
            {movies.map((movie, index) => (
              <Movie
                key={index}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
                imdb={movie.imdb_code}
              />
            ))}
          </InfiniteScroll>
        )}
      </section>
    );
  }
}

export default App;
