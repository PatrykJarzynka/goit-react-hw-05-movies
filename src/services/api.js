const KEY = 'b8d87910aac56b00d09e566d900045a1';

const fetchMovies = (ending, abortController, query = '') => {
  return query === ''
    ? fetch(`https://api.themoviedb.org/3/${ending}?api_key=${KEY}`, {
        signal: abortController.signal,
      }).then(response => {
        return response.json();
      })
    : fetch(`https://api.themoviedb.org/3/${ending}?api_key=${KEY}&query=${query}`, {
        signal: abortController.signal,
      }).then(response => {
        return response.json();
      });
};

const api = {
  fetchMovies,
};

export default api;
