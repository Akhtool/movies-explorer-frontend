class MoviesFilter {
  filterMoviesForName(movies, query) {
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  getShortMovies(_movies) {
    return _movies.filter((movie) => {
      return movie.duration <= 40;
    });
  }
}

export const moviesFilter = new MoviesFilter();
