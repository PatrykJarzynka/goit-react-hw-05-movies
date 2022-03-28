import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import api from '../services/api';
import styled from '@emotion/styled';

const FancyHome = styled.div({
  float: 'left',
});

const FancyH1 = styled.h1({
  fontWeight: 600,
});

const newComponent = Component => {
  return function NewComponent(props) {
    return <Component {...props} style={{ textDecoration: 'none', float: 'left' }}></Component>;
  };
};

const MyLink = newComponent(Link);

export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    api.fetchMovies('trending/all/day', abortController).then(response => {
      setData(response.results);
    });

    return () => abortController.abort();
  }, []);

  return (
    <ErrorBoundary>
      <FancyHome>
        <FancyH1>Trending today</FancyH1>
        <ul>
          {data &&
            data.map(movie =>
              movie.title ? (
                <li key={movie.id}>
                  <MyLink to={'/movies/' + movie.id}>{movie.title}</MyLink>
                </li>
              ) : (
                <li key={movie.id}>
                  <MyLink to={'/movies/' + movie.id}>{movie.name}</MyLink>
                </li>
              ),
            )}
        </ul>
      </FancyHome>
    </ErrorBoundary>
  );
}
