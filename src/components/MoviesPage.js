import { Outlet, useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary';
import api from '../services/api';
import styled from '@emotion/styled';

const FancyMovie = styled.div({
  textAlign: 'start',
});

const FancyInput = styled.input({
  width: '300px',
  padding: '5px',
  border: '1px solid rgb(219, 215, 215)',
  outlineColor: 'blue',
});

const FancyButton = styled.button({
  padding: '5px',
  border: '1px solid rgb(219, 215, 215)',
  '&:hover': { cursor: 'pointer' },
});

export default function MoviePage(props) {
  let navigate = useNavigate();
  let params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    let abortController = new AbortController();
    let data = searchParams.get('query');
    if (!data) return;
    api.fetchMovies('search/movie', abortController, data).then(response => {
      setData(response.results);
    });

    return () => abortController.abort();
  }, [searchParams.get('query')]);

  const handleSubmit = event => {
    event.preventDefault();
    let query = elementRef.current.value;
    if (query) {
      setSearchParams({ query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <ErrorBoundary>
      <FancyMovie>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
        {!params.movieId && (
          <div>
            <form onSubmit={handleSubmit} value={searchParams.get('query') || ''}>
              <FancyInput type="text" ref={elementRef}></FancyInput>
              <FancyButton type="submit">Search</FancyButton>
            </form>
            <div>
              <ul>
                {data &&
                  data.map(element => (
                    <li key={element.id}>
                      <Link to={'/movies/' + element.id}>{element.title}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
        {params.movieId && <Outlet />}
      </FancyMovie>
    </ErrorBoundary>
  );
}
